import { Avatar, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicIcon from "@mui/icons-material/Public";
import CoverImage from "../../../common/components/CoverImage";
import type { Playlist } from "../../../models/playlist";

interface PlaylistHeaderProps {
  playlist: Playlist;
  isSearchOpen?: boolean;
  onToggleSearch?: () => void;
}

const PlaylistHeader = ({
  playlist,
  isSearchOpen,
  onToggleSearch,
}: PlaylistHeaderProps) => {
  const coverUrl = playlist.images?.[0]?.url;
  const trackCount = playlist.items?.total;
  const isPublic = playlist.public !== false;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: 3,
        p: 3,
      }}
    >
      <CoverImage
        src={coverUrl}
        alt={playlist.name}
        size={200}
        radius="8px"
        shadow
      />

      <Box sx={{ minWidth: 0 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.25,
            borderRadius: "999px",
            bgcolor: "rgba(0, 0, 0, 0.35)",
            fontSize: "12px",
          }}
        >
          {isPublic ? (
            <PublicIcon sx={{ fontSize: 14 }} />
          ) : (
            <LockOutlinedIcon sx={{ fontSize: 14 }} />
          )}
          {isPublic ? "공개 플레이리스트" : "비공개 플레이리스트"}
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "28px", md: "48px" },
            fontWeight: 900,
            my: 1,
            wordBreak: "keep-all",
          }}
        >
          {playlist.name}
        </Typography>

        {playlist.description && (
          <Typography
            color="text.secondary"
            sx={{
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {playlist.description}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: 12,
              bgcolor: "primary.main",
            }}
          >
            {playlist.owner.display_name?.[0]}
          </Avatar>
          <Typography fontWeight={700}>
            {playlist.owner.display_name ?? "Unknown"}
          </Typography>
          {trackCount !== undefined && (
            <Typography color="text.secondary">• {trackCount}곡</Typography>
          )}
        </Box>

        {onToggleSearch && (
          <Button
            variant={isSearchOpen ? "outlined" : "contained"}
            color="secondary"
            startIcon={isSearchOpen ? <ExpandLessIcon /> : <AddIcon />}
            onClick={onToggleSearch}
            sx={{ mt: 2, fontWeight: 700 }}
          >
            {isSearchOpen ? "접기" : "곡 추가"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistHeader;
