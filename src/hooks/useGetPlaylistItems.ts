import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPlaylistItems } from "../apis/playlistApi";
import type { GetPlaylistItemsRequest } from "../models/playlist";

const useGetPlaylistItems = ({
  playlist_id,
  limit,
}: GetPlaylistItemsRequest) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["playlist-items", playlist_id],
    queryFn: ({ pageParam }) =>
      getPlaylistItems({ playlist_id, limit, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      return lastPage.offset + lastPage.limit;
    },
  });
};

export default useGetPlaylistItems;
