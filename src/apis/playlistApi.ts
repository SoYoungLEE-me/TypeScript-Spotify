import type {
  GetCurrentUserPlaylistsRequest,
  GetPlaylistItemsRequest,
  Playlist,
  PlaylistItems,
  Playlists,
  AddItemsToPlaylistRequest,
  AddItemsToPlaylistResponse,
} from "../models/playlist";
import { spotifyUserGet, spotifyUserPost } from "../utils/userTokenClient";

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

// 플레이리스트에 곡 추가
export const addItemsToPlaylist = async ({
  playlist_id,
  uris,
}: AddItemsToPlaylistRequest): Promise<AddItemsToPlaylistResponse> => {
  let result: AddItemsToPlaylistResponse = { snapshot_id: "" };

  for (let i = 0; i < uris.length; i += 100) {
    result = await spotifyUserPost<AddItemsToPlaylistResponse>(
      `/playlists/${playlist_id}/items`,
      { uris: uris.slice(i, i + 100) }
    );
  }

  return result;
};
