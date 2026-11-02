import { Suspense, useState } from "react";
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
  return <PlaylistDetailContent key={id} playlistId={id!} />;
};

const PlaylistDetailContent = ({ playlistId }: { playlistId: string }) => {
  const { data: playlist } = useGetPlaylist(playlistId);
  const { data: user } = useGetCurrentUserProfile();

  const canSeeTracks = playlist.owner.id === user?.id || playlist.collaborative;

  const [isSearchOpen, setIsSearchOpen] = useState(playlist.items?.total === 0);

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
                playlistId={playlistId}
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
              fallback={<EmptyState>곡 목록을 불러오지 못했어요.</EmptyState>}
            >
              <Suspense fallback={<PlaylistTrackListSkeleton />}>
                <PlaylistTrackList
                  playlistId={playlistId}
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
