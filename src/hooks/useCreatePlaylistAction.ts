import { useNavigate } from "react-router";
import useCreatePlaylist from "./useCreatePlaylist";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import useGetCurrentUserPlaylists from "./useGetCurrentUserPlaylists";
import { getSpotifyAuthUrl } from "../utils/auth";

const useCreatePlaylistAction = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserProfile();
  const { data: playlists } = useGetCurrentUserPlaylists({ limit: 10 });
  const { mutate, isPending } = useCreatePlaylist();

  const createNewPlaylist = () => {
    //로그인을 안했으면 로그인 페이지로
    if (!user) {
      getSpotifyAuthUrl();
      return;
    }

    const count = playlists?.pages[0]?.total ?? 0;

    //플레이리스트 이름 추가 규칙
    mutate(
      { name: `내 플레이리스트 #${count + 1}`, public: false },
      { onSuccess: (playlist) => navigate(`/playlist/${playlist.id}`) }
    );
  };

  return { createNewPlaylist, isPending };
};

export default useCreatePlaylistAction;
