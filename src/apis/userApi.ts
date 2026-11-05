import type { User } from "../models/user";
import type {
  GetRecentlyPlayedRequest,
  GetRecentlyPlayedResponse,
  GetTopArtistsResponse,
  GetTopItemsRequest,
  GetTopTracksResponse,
} from "../models/listening";
import { spotifyUserGet } from "../utils/userTokenClient";

export const getCurrentUserProfile = (): Promise<User> => {
  return spotifyUserGet<User>("/me");
};

export const getTopTracks = (
  params: GetTopItemsRequest
): Promise<GetTopTracksResponse> => {
  return spotifyUserGet<GetTopTracksResponse>("/me/top/tracks", { ...params });
};

export const getTopArtists = (
  params: GetTopItemsRequest
): Promise<GetTopArtistsResponse> => {
  return spotifyUserGet<GetTopArtistsResponse>("/me/top/artists", {
    ...params,
  });
};

export const getRecentlyPlayed = (
  params: GetRecentlyPlayedRequest
): Promise<GetRecentlyPlayedResponse> => {
  return spotifyUserGet<GetRecentlyPlayedResponse>(
    "/me/player/recently-played",
    { ...params }
  );
};
