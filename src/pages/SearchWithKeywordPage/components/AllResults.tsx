import { Link } from "react-router";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { SearchResponse } from "../../../models/search";
import type { SearchTab } from "../utils/searchTab";
import Card from "../../../common/MusicCard/Card";
import CoverImage from "../../../common/components/CoverImage";
import EmptyState from "../../../common/components/EmptyState";
import TrackTitleSkeleton from "../../../common/Track/TrackRowSkeleton";
import SearchTrackRow from "./SearchTrackRow";

const rowGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(3, minmax(0, 1fr))",
    md: "repeat(5, minmax(0, 1fr))",
  },
  gap: 1,
  "& > :nth-of-type(n + 4)": { display: { xs: "none", md: "block" } },
};

interface SectionProps {
  title: string;
  onMore: () => void;
  children: ReactNode;
}

const Section = ({ title, onMore, children }: SectionProps) => (
  <Box component="section" sx={{ mb: 4 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Typography variant="h2" fontWeight={700} sx={{ fontSize: "20px" }}>
        {title}
      </Typography>
      <Button
        size="small"
        onClick={onMore}
        sx={{ color: "text.secondary", fontWeight: 700 }}
      >
        모두 보기
      </Button>
    </Box>
    {children}
  </Box>
);

export const AllResultsSkeleton = () => (
  <Box>
    {Array.from({ length: 4 }, (_, i) => (
      <Box key={i} sx={{ px: 1, py: 0.75 }}>
        <TrackTitleSkeleton withThumbnail />
      </Box>
    ))}
    <Box sx={{ ...rowGridSx, mt: 4 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton
          key={i}
          variant="circular"
          sx={{ width: "100%", height: "auto", aspectRatio: "1" }}
        />
      ))}
    </Box>
  </Box>
);

interface AllResultsProps {
  result: SearchResponse;
  keyword: string;
  onChangeTab: (tab: SearchTab) => void;
  onShowArtistTracks: (artistName: string) => void;
}

const AllResults = ({
  result,
  keyword,
  onChangeTab,
  onShowArtistTracks,
}: AllResultsProps) => {
  const tracks = result.tracks?.items ?? [];
  const artists = result.artists?.items ?? [];
  const albums = result.albums?.items ?? [];

  if (tracks.length + artists.length + albums.length === 0) {
    return <EmptyState>'{keyword}'에 대한 결과가 없어요</EmptyState>;
  }

  return (
    <Box>
      {tracks.length > 0 && (
        <Section title="곡" onMore={() => onChangeTab("track")}>
          {tracks.slice(0, 4).map((track) => (
            <SearchTrackRow key={track.id} track={track} />
          ))}
        </Section>
      )}

      {artists.length > 0 && (
        <Section title="아티스트" onMore={() => onChangeTab("artist")}>
          <Box sx={rowGridSx}>
            {artists.slice(0, 5).map((artist) => (
              <Box
                key={artist.id}
                onClick={() => onShowArtistTracks(artist.name)}
                sx={{
                  p: 1.5,
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <CoverImage
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  size="100%"
                  radius="50%"
                />
                <Typography noWrap fontWeight={700} sx={{ mt: 1 }}>
                  {artist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  아티스트
                </Typography>
              </Box>
            ))}
          </Box>
        </Section>
      )}

      {albums.length > 0 && (
        <Section title="앨범" onMore={() => onChangeTab("album")}>
          <Box sx={rowGridSx}>
            {albums.slice(0, 5).map((album) => (
              <Link key={album.id} to={`/album/${album.id}`}>
                <Card
                  image={album.images[0]?.url}
                  name={album.name}
                  artistName={`${album.release_date.slice(
                    0,
                    4
                  )} · ${album.artists
                    .map((artist) => artist.name)
                    .join(", ")}`}
                />
              </Link>
            ))}
          </Box>
        </Section>
      )}
    </Box>
  );
};

export default AllResults;
