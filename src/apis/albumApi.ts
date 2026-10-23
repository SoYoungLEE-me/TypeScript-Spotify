import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/config";
import type { GetNewReleasesResponse, Album } from "../models/album";

export const getNewReleases = async (
  token: string
): Promise<GetNewReleasesResponse> => {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit: 6 },
  });

  return response.data;
};

//앨범 상세 정보 불러오기
export const getAlbum = async (token: string, id: string): Promise<Album> => {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/albums/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { market: "KR" },
  });

  return response.data;
};
