import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useInView } from "react-intersection-observer";
import useGetPlaylistItems from "../../../hooks/useGetPlaylistItems";
import PlaylistTrackRow from "./PlaylistTrackRow";
import { PlaylistTrackRowSkeleton } from "./PlaylistTrackListSkeleton";
import { hideOnSmall, trackGridSx } from "./trackGrid";

interface PlaylistTrackListProps {
  playlistId: string;
}

const PlaylistTrackList = ({ playlistId }: PlaylistTrackListProps) => {
  // useSuspenseInfiniteQuery → 여기까지 오면 첫 페이지는 이미 있다
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPlaylistItems({ playlist_id: playlistId, limit: 20 });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const playlistItems = data.pages.flatMap((page) => page.items);

  if (playlistItems.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
        아직 곡이 없어요. 마음에 드는 곡을 추가해 보세요!
      </Typography>
    );
  }

  return (
    <Box>
      {/* 스크롤해도 맨 위에 제목 줄이 붙어있도록 */}
      <Box
        sx={{
          ...trackGridSx,
          py: 1,
          mb: 1,
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          color: "text.secondary",
        }}
      >
        <Typography variant="body2" textAlign="right">
          #
        </Typography>
        <Typography variant="body2">제목</Typography>
        <Typography variant="body2" sx={hideOnSmall}>
          앨범
        </Typography>
        <Typography variant="body2" sx={hideOnSmall}>
          추가한 날짜
        </Typography>
        <AccessTimeIcon fontSize="small" />
      </Box>

      {playlistItems.map((playlistItem, index) => (
        <PlaylistTrackRow
          key={`${playlistItem.item?.id}-${index}`}
          index={index + 1}
          playlistItem={playlistItem}
        />
      ))}

      {hasNextPage && (
        <Box ref={ref}>
          <PlaylistTrackRowSkeleton />
          <PlaylistTrackRowSkeleton />
        </Box>
      )}
    </Box>
  );
};

export default PlaylistTrackList;
