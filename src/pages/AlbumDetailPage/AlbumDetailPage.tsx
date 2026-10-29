import { useParams } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useGetAlbum from "../../hooks/useGetAlbum";
import { formatDuration } from "../../utils/formatDuration";
import type { SimplifiedTrack } from "../../models/album";
import CoverImage from "../../common/components/CoverImage";
import TrackTitle from "../../common/Track/TrackTitle";
import AddToPlaylistButton from "../../common/components/Playlist/AddToPlaylistButton";

const trackGridSx = {
  display: "grid",
  gridTemplateColumns: "32px minmax(0, 1fr) 48px 40px",
  alignItems: "center",
  gap: 2,
  px: 2,
} as const;

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: album } = useGetAlbum(id!);

  const artistNames = album.artists.map((artist) => artist.name).join(", ");
  const releaseYear = album.release_date.slice(0, 4);
  const tracks = album.tracks.items;

  const discs = tracks.reduce<Record<number, SimplifiedTrack[]>>(
    (acc, track) => {
      (acc[track.disc_number] ??= []).push(track);
      return acc;
    },
    {}
  );
  const discNumbers = Object.keys(discs).map(Number);
  const hasMultipleDiscs = discNumbers.length > 1;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "280px minmax(0, 1fr)" },
        gap: { xs: 3, md: 5 },
        alignItems: "start",
        py: 3,
      }}
    >
      <Box
        sx={{
          position: { md: "sticky" },
          top: { md: 0 },
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          alignItems: { xs: "flex-end", md: "stretch" },
          gap: { xs: 2, md: 1.5 },
        }}
      >
        <Box sx={{ width: { xs: 120, sm: 180, md: "100%" }, flexShrink: 0 }}>
          <CoverImage
            src={album.images[0]?.url}
            alt={album.name}
            size="100%"
            radius="8px"
            shadow
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            minWidth: 0,
            flex: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: "capitalize", mt: { md: 1 } }}
          >
            {album.album_type}
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "22px", md: "28px" },
              fontWeight: 900,
              wordBreak: "keep-all",
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

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              flexWrap: "wrap",
              gap: 1,
              mt: { md: 1 },
            }}
          >
            <AddToPlaylistButton
              label="앨범 전체 담기"
              uris={tracks.map((track) => track.uri)}
            />
            <Button
              variant="contained"
              color="secondary"
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 700 }}
            >
              Spotify에서 듣기
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            ...trackGridSx,
            py: 1,
            mb: 1,
            color: "text.secondary",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" textAlign="right">
            #
          </Typography>
          <Typography variant="body2">제목</Typography>
          <AccessTimeIcon fontSize="small" />
          <span />
        </Box>

        {discNumbers.map((discNumber) => (
          <Box key={discNumber}>
            {hasMultipleDiscs && (
              <Typography
                fontWeight={700}
                color="text.secondary"
                sx={{ px: 2, pt: 2, pb: 1 }}
              >
                Disc {discNumber}
              </Typography>
            )}

            {discs[discNumber].map((track) => (
              <Box
                key={track.id}
                sx={{
                  ...trackGridSx,
                  py: 1,
                  borderRadius: "6px",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Typography color="text.secondary" textAlign="right">
                  {track.track_number}
                </Typography>
                <TrackTitle
                  name={track.name}
                  subText={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                  explicit={track.explicit}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatDuration(track.duration_ms)}
                </Typography>
                <AddToPlaylistButton uris={[track.uri]} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AlbumDetailPage;
