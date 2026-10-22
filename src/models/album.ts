import type { ApiResponse, ExternalUrls, Image } from "./commonType";

export interface SimplifiedArtist {
  id: string;
  name: string;
  external_urls: ExternalUrls;
}

export interface SimplifiedAlbum {
  id: string;
  name: string;
  album_type: string;
  total_tracks: number;
  release_date: string;
  images: Image[];
  artists: SimplifiedArtist[];
  external_urls: ExternalUrls;
  uri: string;
}

export interface GetNewReleasesResponse {
  albums: ApiResponse<SimplifiedAlbum>;
}
