import type { ApiResponse, ExternalUrls, Image } from "./commonType";
import type { SimplifiedArtist } from "./artist";

export interface SimplifiedAlbum {
  id: string;
  name: string;
  album_type: string;
  total_tracks: number;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  images: Image[];
  artists: SimplifiedArtist[];
  external_urls: ExternalUrls;
  uri: string;
}

//앨범 상세 정보
export interface SimplifiedTrack {
  id: string;
  name: string;
  track_number: number;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  artists: SimplifiedArtist[];
  external_urls: ExternalUrls;
  uri: string;
}

export interface Album extends SimplifiedAlbum {
  tracks: ApiResponse<SimplifiedTrack>;
}
