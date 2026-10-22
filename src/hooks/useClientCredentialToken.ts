import { useQuery } from "@tanstack/react-query";
import { getClientCredentialToken } from "../apis/authApi";

const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential-token"],
    queryFn: getClientCredentialToken,
    staleTime: 1000 * 60 * 50,
  });

  return data?.access_token;
};

export default useClientCredentialToken;
