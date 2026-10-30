import { Box, Typography } from "@mui/material";
import type { Track } from "../../../../models/track";
import { formatDuration } from "../../../../utils/formatDuration";
import TrackTitle from "../../../../common/Track/TrackTitle";
import AddTrackButton from "./AddTrackButton";
import { hideOnSmall, searchGridSx } from "./searchGrid";

interface SearchResultRowProps {
  track: Track;
  playlistId: string;
  onAdded?: () => void;
}

const SearchResultRow = ({
  track,
  playlistId,
  onAdded,
}: SearchResultRowProps) => {
  const images = track.album.images;

  return (
    <Box
      sx={{
        ...searchGridSx,
        borderRadius: "6px",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <TrackTitle
        name={track.name}
        subText={track.artists.map((artist) => artist.name).join(", ")}
        explicit={track.explicit}
        thumbnail={images[images.length - 1]?.url}
      />
      <Typography
        noWrap
        variant="body2"
        color="text.secondary"
        sx={hideOnSmall}
      >
        {track.album.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formatDuration(track.duration_ms)}
      </Typography>
      <AddTrackButton
        playlistId={playlistId}
        uri={track.uri}
        onAdded={onAdded}
      />
    </Box>
  );
};

export default SearchResultRow;
