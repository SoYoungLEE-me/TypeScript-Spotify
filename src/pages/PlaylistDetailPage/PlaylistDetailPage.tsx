import { Suspense } from "react";
import { useParams } from "react-router";
import { Box } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistTrackList from "./components/PlaylistTrackList";
import PlaylistTrackListSkeleton from "./components/PlaylistTrackListSkeleton";
import EmptyState from "../../common/components/EmptyState";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // 헤더 정보는 페이지에 꼭 필요 → AppLayout 의 페이지 Suspense 가 기다려 줌
  const { data: playlist } = useGetPlaylist(id!);
  const { data: user } = useGetCurrentUserProfile();

  // 남의 플레이리스트면 요청을 보내지 않고 안내만 보여준다
  const canSeeTracks = playlist.owner.id === user?.id || playlist.collaborative;

  return (
    <Box>
      <PlaylistHeader playlist={playlist} />

      {canSeeTracks ? (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              resetKeys={[id]}
              fallback={<EmptyState>곡 목록을 불러오지 못했어요.</EmptyState>}
            >
              <Suspense fallback={<PlaylistTrackListSkeleton />}>
                <PlaylistTrackList playlistId={id!} />
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
