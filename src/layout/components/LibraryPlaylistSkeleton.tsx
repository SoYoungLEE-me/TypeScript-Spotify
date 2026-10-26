import { Box, Skeleton } from "@mui/material";

const LibraryPlaylistSkeleton = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1, py: 0.75 }}
    >
      <Skeleton
        variant="rounded"
        width={48}
        height={48}
        sx={{ flexShrink: 0, borderRadius: "4px" }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
      </Box>
    </Box>
  );
};

export default LibraryPlaylistSkeleton;
