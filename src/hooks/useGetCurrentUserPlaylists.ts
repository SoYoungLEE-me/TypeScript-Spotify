import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import type { GetCurrentUserPlaylistsRequest } from "../models/playlist";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";

const useGetCurrentUserPlaylists = ({
  limit,
}: GetCurrentUserPlaylistsRequest) => {
  const { data: user } = useGetCurrentUserProfile();

  return useInfiniteQuery({
    queryKey: ["current-user-playlists", user?.id],
    enabled: !!user,
    queryFn: ({ pageParam }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      return lastPage.offset + lastPage.limit;
    },
  });
};

export default useGetCurrentUserPlaylists;
