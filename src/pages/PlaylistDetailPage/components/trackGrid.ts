export const trackGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "32px minmax(0, 1fr) 48px",
    md: "32px minmax(0, 4fr) minmax(0, 3fr) 96px 48px",
  },
  alignItems: "center",
  gap: 2,
  px: 2,
} as const;

export const hideOnSmall = { display: { xs: "none", md: "block" } } as const;
