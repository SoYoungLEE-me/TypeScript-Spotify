import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({ limit: 10 });
  console.log("playlists", data);
  return null;
};

export default Library;
