import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getSearchForItem } from "../apis/searchApi";
import { SEARCH_TYPE } from "../models/search";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";

const useGetAlbumsByYear = (year: number) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey: ["albums-by-year", year],
    queryFn: async () => {
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );
      return getSearchForItem(access_token, {
        q: `year:${year}`,
        type: [SEARCH_TYPE.Album],
        market: "KR",
        limit: 10,
      });
    },
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetAlbumsByYear;
