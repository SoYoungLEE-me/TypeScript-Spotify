import type { ApiResponse } from "./commonType";
import type { Track } from "./track";
import type { Artist } from "./artist";

export type TimeRange = "short_term" | "medium_term" | "long_term";

export interface GetTopItemsRequest {
  time_range?: TimeRange;
  limit?: number;
  offset?: number;
}

export type GetTopTracksResponse = ApiResponse<Track>;
export type GetTopArtistsResponse = ApiResponse<Artist>;

export interface GetRecentlyPlayedRequest {
  limit?: number;
  before?: number;
  after?: number;
}

export interface PlayHistory {
  track: Track;
  played_at: string;
}

export interface GetRecentlyPlayedResponse {
  href: string;
  limit: number;
  next: string | null;
  cursors: { after: string; before: string } | null;
  items: PlayHistory[];
}
