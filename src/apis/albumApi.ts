import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/config";
import type { Album } from "../models/album";

//앨범 상세 정보 불러오기
export const getAlbum = async (token: string, id: string): Promise<Album> => {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/albums/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { market: "KR" },
  });

  return response.data;
};
