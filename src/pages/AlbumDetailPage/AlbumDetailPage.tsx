import { useParams } from "react-router";
import { Box, Button, styled, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useGetAlbum from "../../hooks/useGetAlbum";
import { formatDuration } from "../../utils/formatDuration";

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: "24px",
  padding: "24px 0",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const Cover = styled("img")({
  width: "200px",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
});

const TrackRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "40px 1fr 60px",
  alignItems: "center",
  gap: "16px",
  padding: "8px 16px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const EllipsisText = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}) as typeof Typography;

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: album } = useGetAlbum(id!);

  const artistNames = album.artists.map((artist) => artist.name).join(", ");
  const releaseYear = album.release_date.slice(0, 4);

  return (
    <Box>
      <Header>
        <Cover src={album.images[0]?.url} alt={album.name} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
            {album.album_type}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "28px", md: "48px" },
              fontWeight: 900,
              my: 1,
            }}
          >
            {album.name}
          </Typography>
          <Typography color="text.secondary">
            <Box
              component="span"
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              {artistNames}
            </Box>
            {` • ${releaseYear} • ${album.total_tracks}곡`}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 2, fontWeight: 700 }}
          >
            Spotify에서 듣기
          </Button>
        </Box>
      </Header>

      <TrackRow
        sx={{
          color: "text.secondary",
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 0,
          mb: 1,
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        <Typography variant="body2">#</Typography>
        <Typography variant="body2">제목</Typography>
        <AccessTimeIcon fontSize="small" />
      </TrackRow>

      {album.tracks.items.map((track) => (
        <TrackRow key={track.id}>
          <Typography color="text.secondary">{track.track_number}</Typography>
          <Box sx={{ minWidth: 0 }}>
            <EllipsisText fontWeight={700}>{track.name}</EllipsisText>
            <EllipsisText variant="body2" color="text.secondary">
              {track.artists.map((artist) => artist.name).join(", ")}
            </EllipsisText>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {formatDuration(track.duration_ms)}
          </Typography>
        </TrackRow>
      ))}
    </Box>
  );
};

export default AlbumDetailPage;
