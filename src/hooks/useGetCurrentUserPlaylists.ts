import { useInfiniteQuery } from "@tanstack/react-query";

import { getCurrentUserPlaylists } from "../apis/playlistApi";
import type { GetCurrentUserPlaylistsRequest } from "../models/playlist";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";

import {
  confirmPendingCount,
  hasPendingCounts,
} from "../utils/playlistCountSync";

const useGetCurrentUserPlaylists = ({
  limit,
}: GetCurrentUserPlaylistsRequest) => {
  const { data: user } = useGetCurrentUserProfile();

  return useInfiniteQuery({
    queryKey: ["current-user-playlists", user?.id, limit],
    enabled: !!user?.id,

    queryFn: async ({ pageParam }) => {
      const response = await getCurrentUserPlaylists({
        limit,
        offset: pageParam,
      });

      // 서버에서 실제로 확인된 곡 수로 동기화
      response.items.forEach((playlist) => {
        const serverTotal =
          playlist.items?.total ?? playlist.tracks?.total ?? 0;

        confirmPendingCount(playlist.owner.id, playlist.id, serverTotal);
      });

      return response;
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      return lastPage.offset + lastPage.limit;
    },

    // 동기화 대기 중일 때만 3초 간격으로 재조회
    refetchInterval: () => (hasPendingCounts(user?.id) ? 3000 : false),

    refetchIntervalInBackground: false,
  });
};

export default useGetCurrentUserPlaylists;
