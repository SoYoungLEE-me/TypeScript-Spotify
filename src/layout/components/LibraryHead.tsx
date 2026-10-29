import { Box, Button, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylistAction from "../../hooks/useCreatePlaylistAction";

const LibraryHead = () => {
  const { createNewPlaylist, isPending } = useCreatePlaylistAction();

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
      <Button
        onClick={createNewPlaylist}
        disabled={isPending}
        aria-label="새 플레이리스트 만들기"
        title="새 플레이리스트 만들기"
        sx={{ minWidth: 0, color: "primary.main" }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default LibraryHead;
