import { Box, Skeleton } from "@mui/material";
import { hideOnSmall, trackGridSx } from "./trackGrid";

export const PlaylistTrackRowSkeleton = () => (
  <Box sx={{ ...trackGridSx, py: 1 }}>
    <Skeleton variant="text" width={16} sx={{ justifySelf: "end" }} />
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Skeleton
        variant="rounded"
        width={40}
        height={40}
        sx={{ flexShrink: 0 }}
      />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="35%" />
      </Box>
    </Box>
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
