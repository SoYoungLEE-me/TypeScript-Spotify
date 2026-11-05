import { Link } from "react-router";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";
import EmptyState from "../../../common/components/EmptyState";
import { isReissue } from "../../../utils/homeContent";

const NewReleases = () => {
  const { data } = useGetNewReleases();
  const albums = (data.albums?.items ?? []).filter(
    (album) => !isReissue(album.name)
  );

  if (albums.length === 0) {
    return <EmptyState>최근 2주 안에 나온 앨범을 찾지 못했어요.</EmptyState>;
  }

  return (
    <CardGrid singleRow>
      {albums.map((album) => (
        <Link key={album.id} to={`/album/${album.id}`} style={{ minWidth: 0 }}>
          <Card
            image={album.images[0]?.url}
            name={album.name}
            artistName={album.artists.map((artist) => artist.name).join(", ")}
          />
        </Link>
      ))}
    </CardGrid>
  );
};

export default NewReleases;
