import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Collapse } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import EmptyState from "../../common/components/EmptyState";
import CoverBackdrop from "./components/CoverBackdrop";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistSearchSection from "./components/search/PlaylistSearchSection";
import PlaylistTrackList from "./components/PlaylistTrackList";
import PlaylistTrackListSkeleton from "./components/PlaylistTrackListSkeleton";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // 헤더 정보는 페이지에 꼭 필요 → AppLayout 의 페이지 Suspense 가 기다려 줌
  const { data: playlist } = useGetPlaylist(id!);
  const { data: user } = useGetCurrentUserProfile();

  // 남의 플레이리스트면 요청을 보내지 않고 안내만 보여준다
  const canSeeTracks = playlist.owner.id === user?.id || playlist.collaborative;

  const [isSearchOpen, setIsSearchOpen] = useState(playlist.items?.total === 0);

  useEffect(() => {
    setIsSearchOpen(playlist.items?.total === 0);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
          bgcolor: "background.paper",
          mb: 3,
        }}
      >
        <CoverBackdrop coverUrl={playlist.images?.[0]?.url} />

        <Box sx={{ position: "relative" }}>
          <PlaylistHeader
            playlist={playlist}
            isSearchOpen={isSearchOpen}
            onToggleSearch={
              canSeeTracks ? () => setIsSearchOpen((open) => !open) : undefined
            }
          />

          {canSeeTracks && (
            <Collapse in={isSearchOpen} unmountOnExit>
              <PlaylistSearchSection
                playlistId={id!}
                isEmpty={playlist.items?.total === 0}
              />
            </Collapse>
          )}
        </Box>
      </Box>

      {canSeeTracks ? (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              resetKeys={[id]}
              fallback={<EmptyState>곡 목록을 불러오지 못했어요.</EmptyState>}
            >
              <Suspense fallback={<PlaylistTrackListSkeleton />}>
                <PlaylistTrackList
                  playlistId={id!}
                  showEmptyMessage={!isSearchOpen}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      ) : (
        <EmptyState>
          다른 사람이 만든 플레이리스트는 곡 목록을 볼 수 없어요.
          <br />
          Spotify 앱에서 확인해 주세요.
        </EmptyState>
      )}
    </Box>
  );
};

export default PlaylistDetailPage;
