import { Box } from "@mui/material";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import ContentSection from "../../common/components/ContentSection";
import SectionBoundary from "../../common/components/SectionBoundary";
import CardGridSkeleton from "../../common/MusicCard/CardGridSkeleton";
import TrackRowSkeleton from "../../common/Track/TrackRowSkeleton";
import HomeGreeting from "./components/HomeGreeting";
import LoginBanner from "./components/LoginBanner";
import TopTracks from "./components/TopTracks";
import RecentlyPlayed from "./components/RecentlyPlayed";
import TopArtists from "./components/TopArtists";
import TodayArtist, { TodayArtistSkeleton } from "./components/TodayArtist";
import NewReleases from "./components/NewReleases";
import GenreTracks from "./components/GenreTracks";
import YearAgoAlbums from "./components/YearAgoAlbums";
import RecentAlbums from "./components/RecentAlbums";

const RELOGIN_MESSAGE =
  "기록을 불러오지 못했어요. 로그아웃 후 다시 로그인해 보세요.";
const TEN_YEARS_AGO = new Date().getFullYear() - 10;

const HomePage = () => {
  const { data: user, isPending } = useGetCurrentUserProfile();
  const isLoggedOut = !isPending && !user;

  return (
    <Box sx={{ pt: 2 }}>
      {user && <HomeGreeting />}
      {isLoggedOut && <LoginBanner />}

      {user && (
        <>
          <ContentSection title="요즘 자주 듣는 곡" caption="최근 4주">
            <SectionBoundary
              fallback={<TrackRowSkeleton count={6} compact />}
              errorMessage={RELOGIN_MESSAGE}
            >
              <TopTracks />
            </SectionBoundary>
          </ContentSection>

          <ContentSection
            title="최근에 들은 곡"
            caption="Spotify 앱에서 들은 곡"
          >
            <SectionBoundary
              fallback={<CardGridSkeleton />}
              errorMessage={RELOGIN_MESSAGE}
            >
              <RecentlyPlayed />
            </SectionBoundary>
          </ContentSection>

          <ContentSection title="자주 듣는 아티스트" caption="최근 4주">
            <SectionBoundary
              fallback={<CardGridSkeleton circle />}
              errorMessage={RELOGIN_MESSAGE}
            >
              <TopArtists />
            </SectionBoundary>
          </ContentSection>
        </>
      )}

      <ContentSection title="오늘의 아티스트" caption="매일 바뀌어요">
        <SectionBoundary
          fallback={<TodayArtistSkeleton />}
          errorMessage="오늘의 아티스트를 불러오지 못했어요."
        >
          <TodayArtist />
        </SectionBoundary>
      </ContentSection>

      <ContentSection title="새로 나온 앨범" caption="최근 2주">
        <SectionBoundary
          fallback={<CardGridSkeleton />}
          errorMessage="새 앨범을 불러오지 못했어요."
        >
          <NewReleases />
        </SectionBoundary>
      </ContentSection>

      <ContentSection title="장르별 요즘 곡" caption="올해 나온 곡">
        <GenreTracks />
      </ContentSection>

      <ContentSection
        title="10년 전 이맘때"
        caption={`${TEN_YEARS_AGO}년에 나온 앨범`}
      >
        <SectionBoundary
          fallback={<CardGridSkeleton />}
          errorMessage="앨범을 불러오지 못했어요."
        >
          <YearAgoAlbums year={TEN_YEARS_AGO} />
        </SectionBoundary>
      </ContentSection>

      <RecentAlbums />
    </Box>
  );
};

export default HomePage;
