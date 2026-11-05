import { Link } from "react-router";
import { Box } from "@mui/material";
import useGetAlbumsByYear from "../../../hooks/useGetAlbumsByYear";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";
import EmptyState from "../../../common/components/EmptyState";

const YearAgoAlbums = ({ year }: { year: number }) => {
  const { data } = useGetAlbumsByYear(year);
  const albums = data.albums?.items ?? [];

  if (albums.length === 0) {
    return <EmptyState>{year}년 앨범을 찾지 못했어요.</EmptyState>;
  }

  return (
    <CardGrid singleRow>
      {albums.map((album) => (
        <Link
          key={album.id}
          to={`/album/${album.id}`}
          style={{ minWidth: 0, position: "relative" }}
        >
          <Card
            image={album.images[0]?.url}
            name={album.name}
            artistName={album.artists.map((artist) => artist.name).join(", ")}
          />
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              px: 0.75,
              borderRadius: "4px",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {year}
          </Box>
        </Link>
      ))}
    </CardGrid>
  );
};

export default YearAgoAlbums;
