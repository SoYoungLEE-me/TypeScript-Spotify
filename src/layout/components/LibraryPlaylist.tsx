import { Link } from "react-router";
import { Box, Typography } from "@mui/material";
import type { SimplifiedPlaylist } from "../../models/playlist";

interface LibraryPlaylistProps {
  playlist: SimplifiedPlaylist;
  isActive: boolean;
}

const LibraryPlaylist = ({ playlist, isActive }: LibraryPlaylistProps) => {
  const imageUrl = playlist.images?.[0]?.url;

  const trackCount = playlist.items?.total ?? playlist.tracks?.total ?? 0;

  return (
    <Link to={`/playlist/${playlist.id}`}>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 1,
          py: 0.75,
          borderRadius: "6px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          ...(isActive && {
            backgroundColor: theme.palette.action.active,
          }),
        })}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: "4px",
            overflow: "hidden",
            backgroundColor: "action.active",
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={playlist.name}
              width={48}
              height={48}
              style={{ objectFit: "cover", display: "block" }}
            />
          )}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography noWrap fontWeight={700} title={playlist.name}>
            {playlist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {playlist.owner.display_name ?? "Unknown"} · {trackCount}곡
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default LibraryPlaylist;
