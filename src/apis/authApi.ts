import axios from "axios";
import type {
  ClientCredentialTokenResponse,
  ExchangeTokenResponse,
} from "../models/auth";
import { CLIENT_ID, REDIRECT_URI } from "../configs/config";

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    const response = await axios.get("/api/token");
    return response.data;
  };

export const exchangeToken = async (
  code: string,
  codeVerifier: string
): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error("Missing required parameters");
    }

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.error("fail to fetch token");
    throw error;
  }
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<ExchangeTokenResponse> => {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    body,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};
