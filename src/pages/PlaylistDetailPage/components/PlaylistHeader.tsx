import { Avatar, Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicIcon from "@mui/icons-material/Public";
import type { Playlist } from "../../../models/playlist";
import CoverImage from "../../../common/components/CoverImage";

interface PlaylistHeaderProps {
  playlist: Playlist;
}

const PlaylistHeader = ({ playlist }: PlaylistHeaderProps) => {
  const coverUrl = playlist.images?.[0]?.url;
  const trackCount = playlist.items?.total;
  const isPublic = playlist.public !== false;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        mb: 3,
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          transform: "scale(1.3)",
          filter: "blur(40px) brightness(0.55)",
          background: coverUrl
            ? `url("${coverUrl}") center / cover`
            : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.background.paper})`,
        })}
      />

      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${theme.palette.background.paper})`,
        })}
      />

      <Box
        sx={{
          position: "relative",
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
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistHeader;
