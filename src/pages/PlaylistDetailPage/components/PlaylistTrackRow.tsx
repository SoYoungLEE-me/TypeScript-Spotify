import { Box, Typography } from "@mui/material";
import type { PlaylistItem } from "../../../models/playlist";
import { formatDuration } from "../../../utils/formatDuration";
import { formatRelativeDate } from "../../../utils/formatRelativeDate";
import { hideOnSmall, trackGridSx } from "./trackGrid";

interface PlaylistTrackRowProps {
  index: number;
  playlistItem: PlaylistItem;
}

const PlaylistTrackRow = ({ index, playlistItem }: PlaylistTrackRowProps) => {
  const track = playlistItem.item;
  if (!track) return null; //삭제된 곡 등은 건너뛴다

  const thumbnail = track.album.images[track.album.images.length - 1]?.url; //가장 작은 이미지

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
            {track.name}
          </Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {track.explicit && (
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
            {track.artists.map((artist) => artist.name).join(", ")}
          </Typography>
        </Box>
      </Box>

      <Typography
        noWrap
        variant="body2"
        color="text.secondary"
        sx={hideOnSmall}
      ></Typography>

      <Typography
        noWrap
        variant="body2"
        color="text.secondary"
        sx={hideOnSmall}
      >
        {formatRelativeDate(playlistItem.added_at)}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {formatDuration(track.duration_ms)}
      </Typography>
    </Box>
  );
};

export default PlaylistTrackRow;
