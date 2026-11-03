export const searchTrackGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "minmax(0, 1fr) 48px 40px",
    md: "minmax(0, 4fr) minmax(0, 3fr) 48px 40px",
  },
  alignItems: "center",
  gap: 2,
  px: 1,
  py: 0.75,
};

export const hideOnSmall = { display: { xs: "none", md: "block" } };
