import type { ApiResponse, ExternalUrls, Image, Owner } from "./commonType";

export interface SimplifiedPlaylist {
  id: string;
  name: string;
  description: string | null;
  images: Image[] | null;
  owner: Owner;
  public: boolean | null;
  collaborative: boolean;
  uri: string;
  external_urls: ExternalUrls;

  items?: { href: string; total: number };
  tracks?: { href: string; total: number }; //api 내용 변경으로 track, item 둘 다 받아야함.
}

export type Playlists = ApiResponse<SimplifiedPlaylist>;

export interface GetCurrentUserPlaylistsRequest {
  limit?: number;
  offset?: number;
}
