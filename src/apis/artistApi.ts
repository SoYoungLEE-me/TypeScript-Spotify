import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/config";
import type { ApiResponse } from "../models/commonType";
import type { SimplifiedAlbum } from "../models/album";
import type { Artist, GetArtistAlbumsRequest } from "../models/artist";

export const getArtist = async (
  token: string,
  artistId: string
): Promise<Artist> => {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getArtistAlbums = async (
  token: string,
  artistId: string,
  params: GetArtistAlbumsRequest
): Promise<ApiResponse<SimplifiedAlbum>> => {
  const response = await axios.get(
    `${SPOTIFY_BASE_URL}/artists/${artistId}/albums`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }
  );

  return response.data;
};
