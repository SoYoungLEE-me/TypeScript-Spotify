import { Box, Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";

const NewReleases = () => {
  const { data } = useGetNewReleases();
  const albums = data.albums.items;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>
        New Released Albums
      </Typography>

      {albums.length === 0 ? (
        <Typography color="text.secondary">
          아직 새로 나온 앨범이 없어요.
        </Typography>
      ) : (
        <CardGrid>
          {albums.map((album) => (
            <Card
              key={album.id}
              image={album.images[0]?.url}
              name={album.name}
              artistName={album.artists.map((artist) => artist.name).join(", ")}
            />
          ))}
        </CardGrid>
      )}
    </Box>
  );
};

export default NewReleases;
