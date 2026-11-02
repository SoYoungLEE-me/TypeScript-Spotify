import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getCategories } from "../apis/categoryApi";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";

const useGetCategories = (limit = 20) => {
  const queryClient = useQueryClient();

  return useSuspenseInfiniteQuery({
    queryKey: ["categories", limit],
    queryFn: async ({ pageParam }) => {
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );
      return getCategories(access_token, {
        locale: "ko_KR",
        limit,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const page = lastPage.categories;
      if (!page.next) return undefined;
      return page.offset + page.limit;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetCategories;
