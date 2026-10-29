import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemsToPlaylist } from "../apis/playlistApi";
import type { AddItemsToPlaylistRequest } from "../models/playlist";

const useAddItemsToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddItemsToPlaylistRequest) =>
      addItemsToPlaylist(request),
    onSuccess: (_data, { playlist_id }) => {
      queryClient.invalidateQueries({
        // 추가한 곡 관련 화면을 새로 불러올 수 있도록
        queryKey: ["playlist-items", playlist_id],
      }); // 상세 곡 목록
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      }); // 상세 헤더 곡 수
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] }); // 사이드바 곡 수
    },
  });
};

export default useAddItemsToPlaylist;
