import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useInView } from "react-intersection-observer";
import useGetPlaylistItems from "../../../hooks/useGetPlaylistItems";
import EmptyState from "../../../common/components/EmptyState";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";
import PlaylistTrackRow from "./PlaylistTrackRow";
import { PlaylistTrackRowSkeleton } from "./PlaylistTrackListSkeleton";
import ViewModeToggle, { type ViewMode } from "./ViewModeToggle";
import { getItemDisplay } from "./playlistItem";
import { hideOnSmall, trackGridSx } from "./trackGrid";

const VIEW_MODE_KEY = "playlist_view_mode";

const loadViewMode = (): ViewMode => {
  try {
    return localStorage.getItem(VIEW_MODE_KEY) === "grid" ? "grid" : "list";
  } catch {
    return "list";
  }
};

interface PlaylistTrackListProps {
  playlistId: string;
}

const PlaylistTrackList = ({ playlistId }: PlaylistTrackListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPlaylistItems({ playlist_id: playlistId, limit: 20 });

  const [viewMode, setViewMode] = useState<ViewMode>(loadViewMode);

  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem(VIEW_MODE_KEY, mode);
    } catch {
      // 저장이 안 돼도 화면 전환은 그대로 된다
    }
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const playlistItems = data.pages.flatMap((page) => page.items);

  if (playlistItems.length === 0) {
    return (
      <EmptyState>아직 곡이 없어요. 마음에 드는 곡을 추가해 보세요!</EmptyState>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <ViewModeToggle value={viewMode} onChange={changeViewMode} />
      </Box>

      {viewMode === "list" ? (
        <>
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
        </>
      ) : (
        <CardGrid>
          {playlistItems.map((playlistItem, index) => {
            const item = playlistItem.item;
            if (!item) return null;
            const { cover, subText } = getItemDisplay(item);

            return (
              <Card
                key={`${item.id}-${index}`}
                image={cover}
                name={item.name}
                artistName={subText}
              />
            );
          })}
        </CardGrid>
      )}

      {hasNextPage && (
        <Box ref={ref}>
          {viewMode === "list" ? (
            <>
              <PlaylistTrackRowSkeleton />
              <PlaylistTrackRowSkeleton />
            </>
          ) : (
            <CardGrid>
              {Array.from({ length: 6 }, (_, i) => (
                <Box key={i} sx={{ p: 1.5 }}>
                  <Skeleton
                    variant="rounded"
                    sx={{ width: "100%", height: "auto", aspectRatio: "1 / 1" }}
                  />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="50%" />
                </Box>
              ))}
            </CardGrid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PlaylistTrackList;
