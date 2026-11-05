import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { Track } from "../../models/track";
import { formatDuration } from "../../utils/formatDuration";
import AddToPlaylistButton from "../Playlist/AddToPlaylistButton";
import TrackTitle from "./TrackTitle";
import { getTrackRowGridSx, hideOnSmall } from "./trackRowGrid";

interface TrackRowProps {
  track: Track;
  rank?: number;
  meta?: ReactNode;
  compact?: boolean;
}

const TrackRow = ({ track, rank, meta, compact = false }: TrackRowProps) => {
  const images = track.album.images;

  return (
    <Box
      sx={{
        ...getTrackRowGridSx(compact, rank !== undefined),
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      {rank !== undefined && (
        <Typography color="text.secondary" textAlign="center">
          {rank}
        </Typography>
      )}
      <TrackTitle
        name={track.name}
        subText={track.artists.map((artist) => artist.name).join(", ")}
        explicit={track.explicit}
        thumbnail={images[images.length - 1]?.url}
      />
      {!compact && (
        <>
          <Typography
            noWrap
            variant="body2"
            color="text.secondary"
            sx={hideOnSmall}
          >
            {meta ?? track.album.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDuration(track.duration_ms)}
          </Typography>
        </>
      )}
      <AddToPlaylistButton uris={[track.uri]} />
    </Box>
  );
};

export default TrackRow;
