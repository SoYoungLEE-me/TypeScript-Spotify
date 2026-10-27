import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlaylist } from "../apis/playlistApi";

const useGetPlaylist = (playlistId: string) => {
  return useSuspenseQuery({
    queryKey: ["playlist-detail", playlistId],
    queryFn: () => getPlaylist(playlistId),
  });
};

export default useGetPlaylist;
