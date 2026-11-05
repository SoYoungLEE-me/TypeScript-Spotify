export const searchGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "minmax(0, 1fr) 48px 32px",
    md: "minmax(0, 4fr) minmax(0, 3fr) 48px 32px",
  },
  alignItems: "center",
  gap: 2,
  px: 2,
  py: 1,
} as const;

export const hideOnSmall = { display: { xs: "none", md: "block" } } as const;
