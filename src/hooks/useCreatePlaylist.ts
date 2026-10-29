import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import type { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreatePlaylistRequest) => createPlaylist(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlaylist;
