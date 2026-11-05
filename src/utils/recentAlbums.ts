import type { Album } from "../models/album";

const RECENT_ALBUMS_KEY = "recent_albums";
const MAX_RECENT_ALBUMS = 12;

export interface RecentAlbum {
  id: string;
  name: string;
  image?: string;
  artistName: string;
}

export const loadRecentAlbums = (): RecentAlbum[] => {
  try {
    const raw = localStorage.getItem(RECENT_ALBUMS_KEY);
    return raw ? (JSON.parse(raw) as RecentAlbum[]) : [];
  } catch {
    return [];
  }
};

export const addRecentAlbum = (album: Album) => {
  const item: RecentAlbum = {
    id: album.id,
    name: album.name,
    image: album.images[0]?.url,
    artistName: album.artists.map((artist) => artist.name).join(", "),
  };
  const next = [
    item,
    ...loadRecentAlbums().filter((saved) => saved.id !== album.id),
  ].slice(0, MAX_RECENT_ALBUMS);

  try {
    localStorage.setItem(RECENT_ALBUMS_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn("최근 본 앨범을 저장하지 못했어요", error);
  }
};

export const clearRecentAlbums = () => {
  try {
    localStorage.removeItem(RECENT_ALBUMS_KEY);
  } catch (error) {
    console.warn("최근 본 앨범 기록을 지우지 못했어요", error);
  }
};
