import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getClientCredentialToken } from "../apis/authApi";

export const clientCredentialTokenQuery = queryOptions({
  queryKey: ["client-credential-token"],
  queryFn: getClientCredentialToken,
  staleTime: 1000 * 60 * 50, // 토큰 유효시간이 1시간이라 50분 동안은 다시 안 받는다
});

// 토큰 쿼리 설정을 한 곳에 모아두고 훅과 다른 쿼리에서 같이 쓴다

const useClientCredentialToken = (): string => {
  const { data } = useSuspenseQuery(clientCredentialTokenQuery);
  return data.access_token;
};

export default useClientCredentialToken;
