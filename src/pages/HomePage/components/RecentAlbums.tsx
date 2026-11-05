import { useState } from "react";
import { Link } from "react-router";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";
import ContentSection from "../../../common/components/ContentSection";
import {
  clearRecentAlbums,
  loadRecentAlbums,
} from "../../../utils/recentAlbums";

const RecentAlbums = () => {
  const [albums, setAlbums] = useState(loadRecentAlbums);

  if (albums.length === 0) return null;

  const handleClear = () => {
    clearRecentAlbums();
    setAlbums([]);
  };

  return (
    <ContentSection
      title="최근 둘러본 앨범"
      caption="이 기기에서 연 앨범"
      onMore={handleClear}
      moreLabel="기록 지우기"
    >
      <CardGrid singleRow>
        {albums.map((album) => (
          <Link
            key={album.id}
            to={`/album/${album.id}`}
            style={{ minWidth: 0 }}
          >
            <Card
              image={album.image}
              name={album.name}
              artistName={album.artistName}
            />
          </Link>
        ))}
      </CardGrid>
    </ContentSection>
  );
};

export default RecentAlbums;
