import { Box, Skeleton } from "@mui/material";
import CardGrid from "./CardGrid";

interface CardGridSkeletonProps {
  count?: number;
  circle?: boolean;
  singleRow?: boolean;
}

const CardGridSkeleton = ({
  count = 6,
  circle = false,
  singleRow = true,
}: CardGridSkeletonProps) => (
  <CardGrid singleRow={singleRow}>
    {Array.from({ length: count }, (_, i) => (
      <Box key={i} sx={{ p: 1.5, textAlign: circle ? "center" : "left" }}>
        <Skeleton
          variant={circle ? "circular" : "rounded"}
          sx={{ width: "100%", height: "auto", aspectRatio: "1" }}
        />
        <Skeleton
          variant="text"
          width="70%"
          sx={{ mt: 1, mx: circle ? "auto" : 0 }}
        />
        <Skeleton variant="text" width="40%" sx={{ mx: circle ? "auto" : 0 }} />
      </Box>
    ))}
  </CardGrid>
);

export default CardGridSkeleton;
