export const formatRelativeDate = (isoDate: string | null): string => {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  if (diffDays < 1) return "오늘";
  if (diffDays < 7) return rtf.format(-diffDays, "day"); // 어제, 3일 전
  if (diffDays < 30) return rtf.format(-Math.floor(diffDays / 7), "week"); // 2주 전
  return date.toLocaleDateString("ko-KR"); // 한 달이 넘으면 날짜로
};

//ex)"3일 전", "2주 전", "2025. 3. 1."
