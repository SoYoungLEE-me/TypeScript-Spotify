import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getSearchForItem } from "../apis/searchApi";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";
import type { SearchRequest } from "../models/search";

const useSearchItems = (params: SearchRequest) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ["search", params],
    enabled: params.q.trim().length > 0, // 검색어가 비었거나 공백뿐이면 요청 안 함
    queryFn: async ({ pageParam }) => {
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );
      return getSearchForItem(access_token, { ...params, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const tracks = lastPage.tracks;
      if (!tracks?.next) return undefined;
      return tracks.offset + tracks.limit;
    },
    placeholderData: keepPreviousData, // 새 결과 올 때까지 이전 결과 유지
  });
};

export default useSearchItems;
