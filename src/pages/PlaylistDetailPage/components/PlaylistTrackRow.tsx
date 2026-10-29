import { Box, Typography } from "@mui/material";
import type { PlaylistItem } from "../../../models/playlist";
import { formatDuration } from "../../../utils/formatDuration";
import { formatRelativeDate } from "../../../utils/formatRelativeDate";
import TrackTitle from "../../../common/Track/TrackTitle";
import { getItemDisplay } from "./playlistItem";
import { hideOnSmall, trackGridSx } from "./trackGrid";

interface PlaylistTrackRowProps {
  index: number;
  playlistItem: PlaylistItem;
}

const PlaylistTrackRow = ({ index, playlistItem }: PlaylistTrackRowProps) => {
  const item = playlistItem.item;
  if (!item) return null;

  const { thumbnail, subText, albumName } = getItemDisplay(item);

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
