export type SearchTab = "all" | "track" | "album" | "artist";

export const SEARCH_TABS: { value: SearchTab; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "track", label: "곡" },
  { value: "album", label: "앨범" },
  { value: "artist", label: "아티스트" },
];

export const toSearchTab = (value: string | null): SearchTab =>
  SEARCH_TABS.some((tab) => tab.value === value) ? (value as SearchTab) : "all";
