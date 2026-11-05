import { Box } from "@mui/material";
import useGetTopTracks from "../../../hooks/useGetTopTracks";
import TrackRow from "../../../common/Track/TrackRow";
import EmptyState from "../../../common/components/EmptyState";

const TopTracks = () => {
  const { data } = useGetTopTracks({ time_range: "short_term", limit: 6 });
  const tracks = data.items;

  if (tracks.length === 0) {
    return <EmptyState>아직 들은 기록이 충분하지 않아요.</EmptyState>;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gridAutoFlow: { md: "column" },
        gridTemplateRows: {
          md: `repeat(${Math.ceil(tracks.length / 2)}, auto)`,
        },
        columnGap: 3,
      }}
    >
      {tracks.map((track, index) => (
        <TrackRow key={track.id} track={track} rank={index + 1} compact />
      ))}
    </Box>
  );
};

export default TopTracks;
