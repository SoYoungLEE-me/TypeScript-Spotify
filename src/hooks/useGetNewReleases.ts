import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
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
      return getNewReleases(access_token);
    },
  });
};

export default useGetNewReleases;
