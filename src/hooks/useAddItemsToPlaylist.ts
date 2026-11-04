import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import { addItemsToPlaylist } from "../apis/playlistApi";
import type { AddItemsToPlaylistRequest, Playlists } from "../models/playlist";

import { getPendingCount, savePendingCount } from "../utils/playlistCountSync";

const useAddItemsToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddItemsToPlaylistRequest) =>
      addItemsToPlaylist(request),

    onSuccess: async (_data, { playlist_id, uris }) => {
      const sidebarKey = ["current-user-playlists"];

      // 진행 중인 기존 목록 요청 취소
      await queryClient.cancelQueries({
        queryKey: sidebarKey,
      });

      // 사용자별 Playlist 캐시 조회
      const queries = queryClient.getQueriesData<InfiniteData<Playlists>>({
        queryKey: sidebarKey,
      });

      for (const [queryKey, data] of queries) {
        if (!data) continue;

        const playlist = data.pages
          .flatMap((page) => page.items)
          .find((item) => item.id === playlist_id);

        if (!playlist) continue;

        const userId = playlist.owner.id;

        const currentTotal =
          playlist.items?.total ?? playlist.tracks?.total ?? 0;

        const previousPending = getPendingCount(userId, playlist_id) ?? 0;

        const nextTotal = Math.max(currentTotal, previousPending) + uris.length;

        // 새로고침 후에도 임시 곡 수 복원
        savePendingCount(userId, playlist_id, nextTotal);

        // React Query 캐시 직접 갱신
        queryClient.setQueryData<InfiniteData<Playlists>>(
          queryKey,
          (oldData) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                items: page.items.map((item) => {
                  if (item.id !== playlist_id) {
                    return item;
                  }

                  return {
                    ...item,
                    items: item.items
                      ? { ...item.items, total: nextTotal }
                      : undefined,
                    tracks: item.tracks
                      ? { ...item.tracks, total: nextTotal }
                      : undefined,
                  };
                }),
              })),
            };
          }
        );
      }

      // 상세 곡 목록과 헤더 재조회
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["playlist-items", playlist_id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["playlist-detail", playlist_id],
        }),
      ]);

      // 사이드바 목록도 서버에 재확인
      await queryClient.invalidateQueries({
        queryKey: sidebarKey,
      });
    },
  });
};

export default useAddItemsToPlaylist;
