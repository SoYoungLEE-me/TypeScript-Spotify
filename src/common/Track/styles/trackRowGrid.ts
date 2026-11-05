export const getTrackRowGridSx = (compact: boolean, hasRank: boolean) => {
  const rank = hasRank ? "24px " : "";

  return {
    display: "grid",
    gridTemplateColumns: compact
      ? `${rank}minmax(0, 1fr) 40px`
      : {
          xs: `${rank}minmax(0, 1fr) 48px 40px`,
          md: `${rank}minmax(0, 4fr) minmax(0, 3fr) 48px 40px`,
        },
    alignItems: "center",
    gap: 2,
    px: 1,
    py: 0.75,
    borderRadius: "6px",
  };
};

export const hideOnSmall = { display: { xs: "none", md: "block" } };
