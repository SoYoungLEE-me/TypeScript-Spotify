import { Box } from "@mui/material";
import type { Track } from "../../../models/track";
import TrackRow from "../../../common/Track/TrackRow";

interface TrackColumnsProps {
  tracks: Track[];
  showRank?: boolean;
}

const TrackColumns = ({ tracks, showRank = false }: TrackColumnsProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "minmax(0, 1fr)",
        md: "repeat(2, minmax(0, 1fr))",
      },
      gridAutoFlow: { md: "column" },
      gridTemplateRows: { md: `repeat(${Math.ceil(tracks.length / 2)}, auto)` },
      columnGap: 3,
    }}
  >
    {tracks.map((track, index) => (
      <TrackRow
        key={track.id}
        track={track}
        rank={showRank ? index + 1 : undefined}
        compact
      />
    ))}
  </Box>
);

export default TrackColumns;
