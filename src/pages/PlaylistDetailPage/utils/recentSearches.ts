const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT = 5;

export const loadRecentSearches = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

export const saveRecentSearches = (list: string[]) => {
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
  } catch {
    // 저장이 안 돼도 검색은 그대로 된다
  }
};

export const addRecentSearch = (list: string[], keyword: string): string[] => {
  const next = [keyword, ...list.filter((item) => item !== keyword)].slice(
    0,
    MAX_RECENT
  );
  saveRecentSearches(next);
  return next;
};

export const removeRecentSearch = (
  list: string[],
  keyword: string
): string[] => {
  const next = list.filter((item) => item !== keyword);
  saveRecentSearches(next);
  return next;
};
