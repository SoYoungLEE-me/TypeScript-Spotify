import type { ApiResponse } from "./commonType";
import type { Track } from "./track";
import type { SimplifiedAlbum } from "./album";
import type { Artist } from "./artist";

export const enum SEARCH_TYPE {
  Track = "track",
  Album = "album",
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
  Artist = "artist",
}

export interface SearchRequest {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: "audio";
}

export interface SearchResponse {
  tracks?: ApiResponse<Track>;
  albums?: ApiResponse<SimplifiedAlbum>;
  artists?: ApiResponse<Artist>;
}

export const getResultPage = (response: SearchResponse, type: SEARCH_TYPE) => {
  switch (type) {
    case SEARCH_TYPE.Album:
      return response.albums;
    case SEARCH_TYPE.Artist:
      return response.artists;
    default:
      return response.tracks;
  }
};
