import { Link } from "react-router";
import useGetRecentlyPlayed from "../../../hooks/useGetRecentlyPlayed";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";
import EmptyState from "../../../common/components/EmptyState";
import { formatRelativeDate } from "../../../utils/formatRelativeDate";
import type { PlayHistory } from "../../../models/listening";

const removeDuplicates = (items: PlayHistory[]) => {
  const seen = new Set<string>();
  return items.filter(({ track }) => {
    if (seen.has(track.id)) return false;
    seen.add(track.id);
    return true;
  });
};

const RecentlyPlayed = () => {
  const { data } = useGetRecentlyPlayed({ limit: 20 });
  const items = removeDuplicates(data.items);

  if (items.length === 0) {
    return <EmptyState>Spotify 앱에서 들은 곡이 여기에 나와요.</EmptyState>;
  }

  return (
    <CardGrid singleRow>
      {items.map(({ track, played_at }) => (
        <Link
          key={track.id}
          to={`/album/${track.album.id}`}
          style={{ minWidth: 0 }}
        >
          <Card
            image={track.album.images[0]?.url}
            name={track.name}
            artistName={`${track.artists[0]?.name ?? ""} · ${formatRelativeDate(
              played_at
            )}`}
          />
        </Link>
      ))}
    </CardGrid>
  );
};

export default RecentlyPlayed;
