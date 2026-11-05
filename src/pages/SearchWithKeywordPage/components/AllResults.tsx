import { Link } from "react-router";
import { Box } from "@mui/material";
import type { SearchResponse } from "../../../models/search";
import type { SearchTab } from "../utils/searchTab";
import Card from "../../../common/MusicCard/Card";
import CardGrid from "../../../common/MusicCard/CardGrid";
import ArtistCard from "../../../common/MusicCard/ArtistCard";
import CardGridSkeleton from "../../../common/MusicCard/CardGridSkeleton";
import TrackRow from "../../../common/Track/TrackRow";
import TrackRowSkeleton from "../../../common/Track/TrackRowSkeleton";
import ContentSection from "../../../common/components/ContentSection";
import EmptyState from "../../../common/components/EmptyState";

export const AllResultsSkeleton = () => (
  <Box>
    <TrackRowSkeleton count={4} />
    <Box sx={{ mt: 5 }}>
      <CardGridSkeleton circle />
    </Box>
  </Box>
);

interface AllResultsProps {
  result: SearchResponse;
  keyword: string;
  onChangeTab: (tab: SearchTab) => void;
}

const AllResults = ({ result, keyword, onChangeTab }: AllResultsProps) => {
  const tracks = result.tracks?.items ?? [];
  const artists = result.artists?.items ?? [];
  const albums = result.albums?.items ?? [];

  if (tracks.length + artists.length + albums.length === 0) {
    return <EmptyState>'{keyword}'에 대한 결과가 없어요</EmptyState>;
  }

  return (
    <Box>
      {tracks.length > 0 && (
        <ContentSection title="곡" onMore={() => onChangeTab("track")}>
          {tracks.slice(0, 4).map((track) => (
            <TrackRow key={track.id} track={track} />
          ))}
        </ContentSection>
      )}

      {artists.length > 0 && (
        <ContentSection title="아티스트" onMore={() => onChangeTab("artist")}>
          <CardGrid singleRow>
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                image={artist.images[0]?.url}
              />
            ))}
          </CardGrid>
        </ContentSection>
      )}

      {albums.length > 0 && (
        <ContentSection title="앨범" onMore={() => onChangeTab("album")}>
          <CardGrid singleRow>
            {albums.map((album) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                style={{ minWidth: 0 }}
              >
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
          </CardGrid>
        </ContentSection>
      )}
    </Box>
  );
};

export default AllResults;
