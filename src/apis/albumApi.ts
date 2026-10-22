import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/config";
import type { GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (
  token: string
): Promise<GetNewReleasesResponse> => {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit: 6 },
  });

  return response.data;
};
