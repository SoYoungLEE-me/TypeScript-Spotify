import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/config";
import type {
  GetCategoriesRequest,
  GetCategoriesResponse,
} from "../models/category";

export const getCategories = async (
  token: string,
  params: GetCategoriesRequest
): Promise<GetCategoriesResponse> => {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data;
};
