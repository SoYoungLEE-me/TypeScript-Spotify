import type { ApiResponse, ExternalUrls, Image, Owner } from "./commonType";
import type { Track } from "./track";

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

export interface PlaylistItem {
  added_at: string | null;
  added_by: Owner | null;
  is_local: boolean;
  item: Track | null;
}

export type PlaylistItems = ApiResponse<PlaylistItem>;

export interface Playlist extends Omit<SimplifiedPlaylist, "items" | "tracks"> {
  items?: PlaylistItems; // 내 플레이리스트일 때만 곡 목록이 오고 아니면 정보만 온다
}

export interface GetPlaylistItemsRequest {
  playlist_id: string;
  limit?: number;
  offset?: number;
}
