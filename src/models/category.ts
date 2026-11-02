import type { ApiResponse, Image } from "./commonType";

export interface GetCategoriesRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface GetCategoriesResponse {
  categories: ApiResponse<Category>;
}
