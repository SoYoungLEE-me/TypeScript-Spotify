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
  { label: "K-pop", keyword: "k-pop", genre: "k-pop", color: "#993c1d" },
  { label: "발라드", keyword: "발라드", genre: "k-ballad", color: "#3c3489" },
  { label: "인디", keyword: "indie", genre: "k-indie", color: "#085041" },
  { label: "힙합", keyword: "hip hop", genre: "k-rap", color: "#72243e" },
  { label: "R&B", keyword: "r&b", genre: "korean r&b", color: "#633806" },
  { label: "록", keyword: "rock", genre: "k-rock", color: "#0c447c" },
  { label: "OST", keyword: "ost", genre: "korean ost", color: "#3b6d11" },
  { label: "재즈", keyword: "jazz", genre: "jazz", color: "#444441" },
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
