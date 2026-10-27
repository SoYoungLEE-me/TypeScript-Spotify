import { Suspense } from "react";
import { useParams } from "react-router";
import { Box, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistTrackList from "./components/PlaylistTrackList";
import PlaylistTrackListSkeleton from "./components/PlaylistTrackListSkeleton";

const Notice = ({ children }: { children: React.ReactNode }) => (
  <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
    {children}
  </Typography>
);

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // 헤더 정보: 페이지에 꼭 필요 → AppLayout 의 페이지 Suspense 가 기다려 줌
  const { data: playlist } = useGetPlaylist(id!);
  const { data: user } = useGetCurrentUserProfile();

  // 2026년 2월부터 곡 목록은 내 플레이리스트(또는 공동 편집)만 볼 수 있다
  // → 남의 플레이리스트면 요청을 보내지 않고 안내만 보여준다 (403 에러 방지)
  const canSeeTracks = playlist.owner.id === user?.id || playlist.collaborative;

  return (
    <Box>
      <PlaylistHeader playlist={playlist} />

      {canSeeTracks ? (
        // 곡 목록만 따로 감싸서, 느리거나 실패해도 헤더는 그대로 보이게
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              resetKeys={[id]}
              fallback={<Notice>곡 목록을 불러오지 못했어요.</Notice>}
            >
              <Suspense fallback={<PlaylistTrackListSkeleton />}>
                <PlaylistTrackList playlistId={id!} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      ) : (
        <Notice>
          다른 사람이 만든 플레이리스트는 곡 목록을 볼 수 없어요.
          <br />
          Spotify 앱에서 확인해 주세요.
        </Notice>
      )}
    </Box>
  );
};

export default PlaylistDetailPage;
