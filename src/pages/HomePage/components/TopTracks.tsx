import useGetTopTracks from "../../../hooks/useGetTopTracks";
import EmptyState from "../../../common/components/EmptyState";
import TrackColumns from "./TrackColumns";

const TopTracks = () => {
  const { data } = useGetTopTracks({ time_range: "short_term", limit: 6 });

  if (data.items.length === 0) {
    return <EmptyState>아직 들은 기록이 충분하지 않아요.</EmptyState>;
  }

  return <TrackColumns tracks={data.items} showRank />;
};

export default TopTracks;
