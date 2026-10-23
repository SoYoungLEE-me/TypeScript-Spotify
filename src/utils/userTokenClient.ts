import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/config";
import { refreshAccessToken } from "../apis/authApi";
import { handleAxiosError } from "./handleAxiosError";

export const saveUserToken = (data: {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}) => {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem(
    "expires_at",
    String(Date.now() + data.expires_in * 1000)
  );

  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
};

// 만료 1분 전이면 미리 갱신
const getValidAccessToken = async (): Promise<string> => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expiresAt = Number(localStorage.getItem("expires_at"));

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  if (Date.now() < expiresAt - 60 * 1000 || !refreshToken) {
    return accessToken;
  }

  const refreshed = await refreshAccessToken(refreshToken);
  saveUserToken(refreshed);
  return refreshed.access_token;
};

export const spotifyUserGet = async <T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<T> => {
  const accessToken = await getValidAccessToken();

  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Spotify user API request failed");
  }
};
