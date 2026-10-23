import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getAlbum } from "../apis/albumApi";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";

const useGetAlbum = (id: string) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey: ["album", id],
    queryFn: async () => {
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );
      return getAlbum(access_token, id);
    },
  });
};

export default useGetAlbum;
