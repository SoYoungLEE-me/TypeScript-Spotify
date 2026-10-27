import type {
  GetCurrentUserPlaylistsRequest,
  GetPlaylistItemsRequest,
  Playlist,
  PlaylistItems,
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

export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  return spotifyUserGet<Playlist>(`/playlists/${playlistId}`);
};

export const getPlaylistItems = async ({
  playlist_id,
  limit,
  offset,
}: GetPlaylistItemsRequest): Promise<PlaylistItems> => {
  return spotifyUserGet<PlaylistItems>(`/playlists/${playlist_id}/items`, {
    limit,
    offset,
  });
};
