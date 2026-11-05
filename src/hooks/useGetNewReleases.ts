import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getSearchForItem } from "../apis/searchApi";
import { SEARCH_TYPE } from "../models/search";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";

const useGetNewReleases = () => {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      // 캐시에 토큰이 있으면 그걸 쓰고 없거나 오래됐으면 새로 받아온다
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );
      return getSearchForItem(access_token, {
        q: "tag:new",
        type: [SEARCH_TYPE.Album],
        market: "KR",
        limit: 10,
      });
    },
    staleTime: 1000 * 60 * 30,
  });
};

export default useGetNewReleases;
