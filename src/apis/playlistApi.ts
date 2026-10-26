import type {
  GetCurrentUserPlaylistsRequest,
  Playlists,
} from "../models/playlist";
import { spotifyUserGet } from "../utils/userTokenClient";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistsRequest): Promise<Playlists> => {
  return spotifyUserGet<Playlists>("/me/playlists", {
    limit,
    offset,
  });
};
