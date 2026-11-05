import useGetTopArtists from "../../../hooks/useGetTopArtists";
import CardGrid from "../../../common/MusicCard/CardGrid";
import ArtistCard from "../../../common/MusicCard/ArtistCard";
import EmptyState from "../../../common/components/EmptyState";

const TopArtists = () => {
  const { data } = useGetTopArtists({ time_range: "short_term", limit: 6 });

  if (data.items.length === 0) {
    return <EmptyState>아직 들은 기록이 충분하지 않아요.</EmptyState>;
  }

  return (
    <CardGrid singleRow>
      {data.items.map((artist) => (
        <ArtistCard
          key={artist.id}
          name={artist.name}
          image={artist.images[0]?.url}
        />
      ))}
    </CardGrid>
  );
};

export default TopArtists;
