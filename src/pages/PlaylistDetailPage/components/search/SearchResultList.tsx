import { useEffect } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import useSearchItems from "../../../../hooks/useSearchItems";
import { SEARCH_TYPE } from "../../../../models/search";
import EmptyState from "../../../../common/components/EmptyState";
import TrackTitleSkeleton from "../../../../common/Track/TrackRowSkeleton";
import SearchResultRow from "./SearchResultRow";
import { hideOnSmall, searchGridSx } from "./searchGrid";

const SearchResultRowSkeleton = () => (
  <Box sx={searchGridSx}>
    <TrackTitleSkeleton withThumbnail />
    <Skeleton variant="text" width="60%" sx={hideOnSmall} />
    <Skeleton variant="text" width={32} />
    <Skeleton variant="circular" width={32} height={32} />
  </Box>
);

interface SearchResultListProps {
  keyword: string;
  playlistId: string;
  onAdded?: () => void;
}

const SearchResultList = ({
  keyword,
  playlistId,
  onAdded,
}: SearchResultListProps) => {
  const {
    data,
    isLoading,
    isError,
    isPlaceholderData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItems({
    q: keyword,
    type: [SEARCH_TYPE.Track],
    market: "KR",
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!keyword.trim()) {
    return <EmptyState>추가하고 싶은 곡을 검색해 보세요</EmptyState>;
  }

  if (isLoading) {
    return (
      <Box>
        {Array.from({ length: 5 }, (_, i) => (
          <SearchResultRowSkeleton key={i} />
        ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <EmptyState>검색하지 못했어요. 잠시 후 다시 시도해 주세요.</EmptyState>
    );
  }

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];

  if (tracks.length === 0) {
    return <EmptyState>'{keyword}'에 대한 결과가 없어요</EmptyState>;
  }

  return (
    <Box
      sx={{ opacity: isPlaceholderData ? 0.5 : 1, transition: "opacity 0.2s" }}
    >
      {tracks.map((track, index) => (
        <SearchResultRow
          key={`${track.id}-${index}`}
          track={track}
          playlistId={playlistId}
          onAdded={onAdded}
        />
      ))}

      {hasNextPage && (
        <Box ref={ref}>
          <SearchResultRowSkeleton />
          <SearchResultRowSkeleton />
        </Box>
      )}
      {!hasNextPage && tracks.length > 10 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", py: 3 }}
        >
          검색 결과를 모두 불러왔어요
        </Typography>
      )}
    </Box>
  );
};

export default SearchResultList;
