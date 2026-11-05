import type { PlayableItem } from "../../../models/playlist";
import type { Track } from "../../../models/track";

const isTrack = (item: PlayableItem): item is Track => {
  return item.type === "track";
};

export const getItemDisplay = (item: PlayableItem) => {
  const images = isTrack(item) ? item.album.images : item.images;

  return {
    cover: images[0]?.url,
    thumbnail: images[images.length - 1]?.url,
    subText: isTrack(item)
      ? item.artists.map((artist) => artist.name).join(", ")
      : "팟캐스트",
    albumName: isTrack(item) ? item.album.name : "-",
  };
};
