import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchInput from "./SearchInput";
import SearchResultList from "./SearchResultList";
import {
  addRecentSearch,
  loadRecentSearches,
  removeRecentSearch,
} from "./recentSearches";

interface PlaylistSearchSectionProps {
  playlistId: string;
  isEmpty: boolean;
}

const PlaylistSearchSection = ({
  playlistId,
  isEmpty,
}: PlaylistSearchSectionProps) => {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [recentSearches, setRecentSearches] =
    useState<string[]>(loadRecentSearches);

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(inputValue.trim()), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const rememberKeyword = (value: string) => {
    if (value) setRecentSearches((list) => addRecentSearch(list, value));
  };

  const searchNow = (value: string) => {
    setInputValue(value);
    setKeyword(value);
  };

  return (
    <Box component="section">
      <Box
        sx={{
          mx: { xs: 2, md: 3 },
          mb: { xs: 2, md: 3 },
          pt: { xs: 2, md: 3 },
          borderTop: 1,
          borderColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <Typography
          fontWeight={700}
          sx={{ fontSize: { xs: "16px", md: "18px" }, wordBreak: "keep-all" }}
        >
          {isEmpty
            ? "아직 비어 있는 플레이리스트예요"
            : "이 플레이리스트에 곡 추가하기"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 2 }}
        >
          {isEmpty
            ? "좋아하는 곡을 검색해서 첫 곡을 채워보세요"
            : "곡 이름이나 가수로 찾아서 바로 담을 수 있어요"}
        </Typography>

        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          onClear={() => searchNow("")}
          onSubmit={() => {
            const value = inputValue.trim();
            searchNow(value);
            rememberKeyword(value);
          }}
          recentSearches={recentSearches}
          activeKeyword={keyword}
          onSelectRecent={searchNow}
          onRemoveRecent={(value) =>
            setRecentSearches((list) => removeRecentSearch(list, value))
          }
        />

        <Box sx={{ mt: 2 }}>
          <SearchResultList
            keyword={keyword}
            playlistId={playlistId}
            onAdded={() => rememberKeyword(keyword)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistSearchSection;
