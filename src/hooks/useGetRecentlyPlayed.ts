import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecentlyPlayed } from "../apis/userApi";
import type { GetRecentlyPlayedRequest } from "../models/listening";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";

const useGetRecentlyPlayed = (params: GetRecentlyPlayedRequest) => {
  const { data: user } = useGetCurrentUserProfile();

  return useSuspenseQuery({
    queryKey: ["recently-played", user?.id, params],
    queryFn: () => getRecentlyPlayed(params),
    staleTime: 1000 * 60,
  });
};

export default useGetRecentlyPlayed;
