import { Box, Skeleton } from "@mui/material";
import TrackTitleSkeleton from "./TrackTitleSkeleton";
import { getTrackRowGridSx, hideOnSmall } from "./trackRowGrid";

interface TrackRowSkeletonProps {
  count?: number;
  compact?: boolean;
}

const TrackRowSkeleton = ({
  count = 4,
  compact = false,
}: TrackRowSkeletonProps) => (
  <Box>
    {Array.from({ length: count }, (_, i) => (
      <Box key={i} sx={getTrackRowGridSx(compact, false)}>
        <TrackTitleSkeleton withThumbnail />
        {!compact && (
          <>
            <Skeleton variant="text" width="60%" sx={hideOnSmall} />
            <Skeleton variant="text" width={32} />
          </>
        )}
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    ))}
  </Box>
);

export default TrackRowSkeleton;
