import { Box, Button, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";

const LibraryHead = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <BookmarkIcon sx={{ color: "text.secondary" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button sx={{ minWidth: 0, color: "primary.main" }}>
        <AddIcon />
      </Button>
    </Box>
  );
};

export default LibraryHead;
