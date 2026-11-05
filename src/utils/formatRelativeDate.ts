export const formatRelativeDate = (isoDate: string | null): string => {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  if (diffDays < 1) {
    const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diffMinutes < 60)
      return rtf.format(-Math.max(diffMinutes, 1), "minute"); // 5분 전
    return rtf.format(-Math.floor(diffMinutes / 60), "hour"); // 3시간 전
  }
  if (diffDays < 7) return rtf.format(-diffDays, "day"); // 어제, 3일 전
  if (diffDays < 30) return rtf.format(-Math.floor(diffDays / 7), "week"); // 2주 전
  return date.toLocaleDateString("ko-KR"); // 한 달이 넘으면 날짜로
};

//ex)"3일 전", "2주 전", "2025. 3. 1."
