import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/config";
import type { SearchRequest, SearchResponse } from "../models/search";

export const getSearchForItem = async (
  token: string,
  request: SearchRequest
): Promise<SearchResponse> => {
  const response = await axios.get<SearchResponse>(
    `${SPOTIFY_BASE_URL}/search`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: request.q,
        type: request.type.join(","),
        limit: request.limit ?? 10,
        offset: request.offset ?? 0,
        market: request.market,
      },
    }
  );

  return response.data;
};
