import type { SearchResponse } from "../../../models/search";
import type { Track } from "../../../models/track";
import type { SimplifiedAlbum } from "../../../models/album";
import type { Artist } from "../../../models/artist";

export type TopResult =
  | { kind: "artist"; item: Artist }
  | { kind: "album"; item: SimplifiedAlbum }
  | { kind: "track"; item: Track };

const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, "");

export const pickTopResult = (
  response: SearchResponse,
  keyword: string
): TopResult | null => {
  const target = normalize(keyword);
  const isMatch = (name: string) => normalize(name) === target;

  const artist = response.artists?.items.find((a) => isMatch(a.name));
  if (artist) return { kind: "artist", item: artist };

  const album = response.albums?.items.find((a) => isMatch(a.name));
  if (album) return { kind: "album", item: album };

  const track = response.tracks?.items[0];
  if (track) return { kind: "track", item: track };

  return null;
};

export const getTopResultImage = (top: TopResult) =>
  top.kind === "track"
    ? top.item.album.images[0]?.url
    : top.item.images[0]?.url;
