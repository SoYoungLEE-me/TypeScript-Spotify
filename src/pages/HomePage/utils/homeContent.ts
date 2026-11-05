import type { SimplifiedAlbum } from "../../../models/album";

export const getGreeting = (hour: number) => {
  if (hour < 5) return "좋은 새벽이에요";
  if (hour < 12) return "좋은 아침이에요";
  if (hour < 18) return "좋은 오후예요";
  return "좋은 저녁이에요";
};

const REISSUE_PATTERN = /anniversary|deluxe|remaster/i;

export const isReissue = (albumName: string) => REISSUE_PATTERN.test(albumName);

export const GENRES = [
  { label: "K-pop", query: "k-pop" },
  { label: "발라드", query: "발라드" },
  { label: "인디", query: "인디" },
  { label: "힙합", query: "힙합" },
  { label: "R&B", query: "r&b" },
  { label: "록", query: "rock" },
  { label: "OST", query: "ost" },
  { label: "재즈", query: "jazz" },
];

export const pickTodayArtistId = (albums: SimplifiedAlbum[], date: Date) => {
  const artistIds = [
    ...new Set(
      albums
        .map((album) => album.artists[0]?.id)
        .filter((id): id is string => !!id)
    ),
  ];
  if (artistIds.length === 0) return null;

  const dayIndex = Math.floor(date.getTime() / 86400000);
  return artistIds[dayIndex % artistIds.length];
};
