import { Box, Skeleton } from "@mui/material";

interface TrackTitleSkeletonProps {
  withThumbnail?: boolean;
}

const TrackTitleSkeleton = ({
  withThumbnail = false,
}: TrackTitleSkeletonProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      {withThumbnail && (
        <Skeleton
          variant="rounded"
          width={40}
          height={40}
          sx={{ flexShrink: 0 }}
        />
      )}
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="35%" />
      </Box>
    </Box>
  );
};

export default TrackTitleSkeleton;
