import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import type { ExchangeTokenResponse } from "../models/auth";
import { saveUserToken } from "../utils/userTokenClient";

const useExchangeToken = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      saveUserToken(data);
      localStorage.removeItem("code_verifier");
      queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
    },
  });
};

export default useExchangeToken;
