import { Box, Skeleton } from "@mui/material";
import TrackTitleSkeleton from "../../../common/Track/TrackRowSkeleton";
import { hideOnSmall, trackGridSx } from "./trackGrid";

export const PlaylistTrackRowSkeleton = () => (
  <Box sx={{ ...trackGridSx, py: 1 }}>
    <Skeleton variant="text" width={16} sx={{ justifySelf: "end" }} />
    <TrackTitleSkeleton withThumbnail />
    <Skeleton variant="text" width="70%" sx={hideOnSmall} />
    <Skeleton variant="text" width="60%" sx={hideOnSmall} />
    <Skeleton variant="text" width={32} />
  </Box>
);

const PlaylistTrackListSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <Box>
    {Array.from({ length: rows }, (_, i) => (
      <PlaylistTrackRowSkeleton key={i} />
    ))}
  </Box>
);

export default PlaylistTrackListSkeleton;
