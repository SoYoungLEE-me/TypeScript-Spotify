import { Link } from "react-router";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import useGetArtistWithAlbums from "../../../hooks/useGetArtistWithAlbums";
import Card from "../../../common/MusicCard/Card";
import CoverBackdrop from "../../../common/components/CoverBackdrop";
import CoverImage from "../../../common/components/CoverImage";
import EmptyState from "../../../common/components/EmptyState";
import { isReissue, pickTodayArtistId } from "../utils/homeContent";

const cardSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "12px",
  bgcolor: "background.paper",
} as const;

const contentSx = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: {
    xs: "minmax(0, 1fr)",
    md: "minmax(0, 2fr) minmax(0, 3fr)",
  },
  gap: 3,
  p: 3,
} as const;

export const TodayArtistSkeleton = () => (
  <Box sx={cardSx}>
    <Box sx={contentSx}>
      <Box>
        <Skeleton variant="circular" width={140} height={140} />
        <Skeleton variant="text" width="50%" sx={{ mt: 2, fontSize: "32px" }} />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 1,
        }}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            sx={{ width: "100%", height: "auto", aspectRatio: "1" }}
          />
        ))}
      </Box>
    </Box>
  </Box>
);

const TodayArtistCard = ({ artistId }: { artistId: string }) => {
  const { data } = useGetArtistWithAlbums(artistId);
  const { artist, albums } = data;
  const image = artist.images[0]?.url;

  return (
    <Box sx={cardSx}>
      <CoverBackdrop coverUrl={image} />

      <Box sx={contentSx}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minWidth: 0,
          }}
        >
          <CoverImage
            src={image}
            alt={artist.name}
            size={140}
            radius="50%"
            shadow
          />
          <Typography variant="body2" fontWeight={700} sx={{ mt: 2 }}>
            이번 주 새 앨범을 낸 아티스트
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "28px", md: "40px" },
              fontWeight: 900,
              my: 1,
              wordBreak: "keep-all",
            }}
          >
            {artist.name}
          </Typography>
          <Button
            component={Link}
            to={`/search/${encodeURIComponent(artist.name)}?type=track`}
            variant="contained"
            color="secondary"
            sx={{ alignSelf: "flex-start" }}
          >
            곡 보기
          </Button>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>
            최신 앨범
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 1,
            }}
          >
            {albums.map((album) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                style={{ minWidth: 0 }}
              >
                <Card
                  image={album.images[0]?.url}
                  name={album.name}
                  artistName={album.release_date.slice(0, 4)}
                />
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const TodayArtist = () => {
  const { data } = useGetNewReleases();
  const albums = (data.albums?.items ?? []).filter(
    (album) => !isReissue(album.name)
  );
  const artistId = pickTodayArtistId(albums, new Date());

  if (!artistId) {
    return <EmptyState>오늘 소개할 아티스트를 찾지 못했어요.</EmptyState>;
  }

  return <TodayArtistCard artistId={artistId} />;
};

export default TodayArtist;
