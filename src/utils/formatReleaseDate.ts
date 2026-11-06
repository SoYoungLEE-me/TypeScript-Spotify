export const formatReleaseDate = (
  date: string,
  precision: "year" | "month" | "day" = "day"
) => {
  const [year, month, day] = date.split("-").map(Number);

  if (precision === "year" || !month) return `${year}년`;
  if (precision === "month" || !day) return `${year}년 ${month}월`;
  return `${year}년 ${month}월 ${day}일`;
};
