import { Box, Typography } from "@mui/material";
import type { PlayableItem, PlaylistItem } from "../../../models/playlist";
import type { Track } from "../../../models/track";
import { formatDuration } from "../../../utils/formatDuration";
import { formatRelativeDate } from "../../../utils/formatRelativeDate";
import TrackTitle from "../../../common/Track/TrackTitle";
import { hideOnSmall, trackGridSx } from "./trackGrid";

// 노래인지 확인
const isTrack = (item: PlayableItem): item is Track => {
  return item.type === "track";
};

interface PlaylistTrackRowProps {
  index: number;
  playlistItem: PlaylistItem;
}

const PlaylistTrackRow = ({ index, playlistItem }: PlaylistTrackRowProps) => {
  const item = playlistItem.item;
  if (!item) return null; // 삭제된 곡 등은 건너뛰기

  // 노래면 앨범 이미지, 에피소드면 에피소드 이미지
  const images = isTrack(item) ? item.album.images : item.images;
  const thumbnail = images[images.length - 1]?.url;

  // 노래면 가수 이름, 에피소드면 팟캐스트
  const subText = isTrack(item)
    ? item.artists.map((artist) => artist.name).join(", ")
    : "팟캐스트";

  // 노래면 앨범 이름, 에피소드는 앨범이 없음
  const albumName = isTrack(item) ? item.album.name : "-";

  return (
    <Box
      sx={{
        ...trackGridSx,
        py: 1,
        borderRadius: "6px",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Typography color="text.secondary" textAlign="right">
        {index}
      </Typography>

      <TrackTitle
        name={item.name}
        subText={subText}
        explicit={item.explicit}
        thumbnail={thumbnail}
      />

      <Typography
        noWrap
        variant="body2"
        color="text.secondary"
        sx={hideOnSmall}
      >
        {albumName}
      </Typography>

      <Typography
        noWrap
        variant="body2"
        color="text.secondary"
        sx={hideOnSmall}
      >
        {formatRelativeDate(playlistItem.added_at)}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {formatDuration(item.duration_ms)}
      </Typography>
    </Box>
  );
};

export default PlaylistTrackRow;
