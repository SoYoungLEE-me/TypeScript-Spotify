import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getSearchForItem } from "../apis/searchApi";
import { SEARCH_TYPE } from "../models/search";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";

const useGetGenreTracks = (query: string, year: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["genre-tracks", query, year],
    queryFn: async () => {
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );
      return getSearchForItem(access_token, {
        q: `${query} year:${year}`,
        type: [SEARCH_TYPE.Track],
        market: "KR",
        limit: 10,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 30,
  });
};

export default useGetGenreTracks;
