import useGetNewReleases from "../hooks/useGetNewReleases";

const HomePage = () => {
  const { data, error } = useGetNewReleases();
  console.log("new releases", data, error);

  return <div>홈페이지</div>;
};

export default HomePage;
