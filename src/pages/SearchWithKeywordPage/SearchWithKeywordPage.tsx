import { useNavigate, useParams, useSearchParams } from "react-router";
import { Box } from "@mui/material";
import useSearchItems from "../../hooks/useSearchItems";
import { SEARCH_TYPE } from "../../models/search";
import CoverBackdrop from "../../common/components/CoverBackdrop";
import EmptyState from "../../common/components/EmptyState";
import SearchHeader from "../../common/components/SearchHeader";
import { toSearchTab, type SearchTab } from "./utils/searchTab";
import { getTopResultImage, pickTopResult } from "./utils/pickTopResult";
import SearchTypeChips from "./components/SearchTypeChips";
import TopResultHero from "./components/TopResultHero";
import AllResults, { AllResultsSkeleton } from "./components/AllResults";

const SearchWithKeywordPage = () => {
  const { keyword = "" } = useParams<{ keyword: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = toSearchTab(searchParams.get("type"));

  const { data, isLoading, isError, isPlaceholderData } = useSearchItems({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    market: "KR",
  });

  const result = data?.pages[0];
  const top = result ? pickTopResult(result, keyword) : null;

  const handleSearch = (value: string) => {
    navigate(value ? `/search/${encodeURIComponent(value)}` : "/search");
  };

  const handleChangeTab = (nextTab: SearchTab) => {
    setSearchParams(nextTab === "all" ? {} : { type: nextTab });
  };

  const handleShowArtistTracks = (artistName: string) => {
    navigate(`/search/${encodeURIComponent(artistName)}?type=track`);
  };

  return (
    <Box sx={{ pt: 2 }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
          bgcolor: "background.paper",
          mb: 3,
        }}
      >
        <CoverBackdrop coverUrl={top ? getTopResultImage(top) : undefined} />

        <Box sx={{ position: "relative", p: { xs: 2, md: 3 } }}>
          <SearchHeader
            key={keyword}
            defaultValue={keyword}
            onSearch={handleSearch}
          />
          <SearchTypeChips value={tab} onChange={handleChangeTab} />
          {tab === "all" && top && (
            <TopResultHero
              top={top}
              onShowArtistTracks={handleShowArtistTracks}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          opacity: isPlaceholderData ? 0.5 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {tab === "all" &&
          (isLoading ? (
            <AllResultsSkeleton />
          ) : isError || !result ? (
            <EmptyState>
              검색하지 못했어요. 잠시 후 다시 시도해 주세요.
            </EmptyState>
          ) : (
            <AllResults
              result={result}
              keyword={keyword}
              onChangeTab={handleChangeTab}
              onShowArtistTracks={handleShowArtistTracks}
            />
          ))}

        {tab !== "all" && <EmptyState>아직 만드는 중</EmptyState>}
      </Box>
    </Box>
  );
};

export default SearchWithKeywordPage;
