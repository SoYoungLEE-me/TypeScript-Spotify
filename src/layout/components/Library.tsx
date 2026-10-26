import { useEffect } from "react";
import { useLocation } from "react-router";
import { Box } from "@mui/material"; // CircularProgress 는 이제 안 씀
import LibraryPlaylistSkeleton from "./LibraryPlaylistSkeleton";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import LibraryPlaylist from "./LibraryPlaylist";
import EmptyPlaylist from "./EmptyPlaylist";

const Library = () => {
  const { pathname } = useLocation();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserProfile();
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({ limit: 10 });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isUserLoading || (user && isPending)) {
    return (
      <Box>
        {Array.from({ length: 6 }, (_, i) => (
          <LibraryPlaylistSkeleton key={i} />
        ))}
      </Box>
    );
  }

  const playlists = data?.pages.flatMap((page) => page.items) ?? [];

  // 로그인 안 했거나 플레이리스트가 하나도 없으면 안내 카드
  if (!user || playlists.length === 0) {
    return <EmptyPlaylist />;
  }

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.2) transparent",
      }}
    >
      {playlists.map((playlist) => (
        <LibraryPlaylist
          key={playlist.id}
          playlist={playlist}
          isActive={pathname === `/playlist/${playlist.id}`}
        />
      ))}

      {hasNextPage && (
        <Box ref={ref}>
          <LibraryPlaylistSkeleton />
          <LibraryPlaylistSkeleton />
        </Box>
      )}
    </Box>
  );
};

export default Library;
