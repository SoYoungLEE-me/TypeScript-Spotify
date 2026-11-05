import { useSuspenseQuery } from "@tanstack/react-query";
import { getTopArtists } from "../apis/userApi";
import type { GetTopItemsRequest } from "../models/listening";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";

const useGetTopArtists = (params: GetTopItemsRequest) => {
  const { data: user } = useGetCurrentUserProfile();

  return useSuspenseQuery({
    queryKey: ["top-artists", user?.id, params],
    queryFn: () => getTopArtists(params),
    staleTime: 1000 * 60 * 10,
  });
};

export default useGetTopArtists;
