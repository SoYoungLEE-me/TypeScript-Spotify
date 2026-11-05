import { useSuspenseQuery } from "@tanstack/react-query";
import { getTopTracks } from "../apis/userApi";
import type { GetTopItemsRequest } from "../models/listening";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";

const useGetTopTracks = (params: GetTopItemsRequest) => {
  const { data: user } = useGetCurrentUserProfile();

  return useSuspenseQuery({
    queryKey: ["top-tracks", user?.id, params],
    queryFn: () => getTopTracks(params),
    staleTime: 1000 * 60 * 10,
  });
};

export default useGetTopTracks;
