import { Box, Typography } from "@mui/material";
import type { PlayableItem, PlaylistItem } from "../../../models/playlist";
import type { Track } from "../../../models/track";
import { formatDuration } from "../../../utils/formatDuration";
import { formatRelativeDate } from "../../../utils/formatRelativeDate";
import { hideOnSmall, trackGridSx } from "./trackGrid";

// 노래인지 확인 (true 면 TypeScript 가 이후 코드에서 Track 으로 알아본다)
const isTrack = (item: PlayableItem): item is Track => {
  return item.type === "track";
};

interface PlaylistTrackRowProps {
  index: number;
  playlistItem: PlaylistItem;
}

const PlaylistTrackRow = ({ index, playlistItem }: PlaylistTrackRowProps) => {
  const item = playlistItem.item;
  if (!item) return null; // 삭제된 곡 등은 건너뛰도록

  // 노래면 앨범 이미지, 에피소드면 에피소드 이미지
  const images = isTrack(item) ? item.album.images : item.images;
  const thumbnail = images[images.length - 1]?.url; // 가장 작은 이미지

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

      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}
      >
        <Box
          component="img"
          src={thumbnail}
          alt=""
          sx={{
            width: 40,
            height: 40,
            borderRadius: "4px",
            flexShrink: 0,
            objectFit: "cover",
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography noWrap fontWeight={700}>
            {item.name}
          </Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {item.explicit && (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  px: 0.5,
                  mr: 0.75,
                  borderRadius: "2px",
                  bgcolor: "text.secondary",
                  color: "background.paper",
                  fontSize: "10px",
                  fontWeight: 700,
                  lineHeight: "16px",
                }}
              >
                E
              </Box>
            )}
            {subText}
          </Typography>
        </Box>
      </Box>

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
