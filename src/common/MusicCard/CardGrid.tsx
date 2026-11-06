import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
  singleRow?: boolean;
}

const singleRowSx = {
  gridTemplateColumns: {
    xs: "none",
    sm: "repeat(3, minmax(0, 1fr))",
    md: "repeat(4, minmax(0, 1fr))",
    lg: "repeat(6, minmax(0, 1fr))",
  },
  gridAutoFlow: { xs: "column", sm: "row" },
  gridAutoColumns: { xs: "42%", sm: "auto" },
  overflowX: { xs: "auto", sm: "visible" },
  scrollSnapType: { xs: "x mandatory", sm: "none" },
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
  "& > *": { scrollSnapAlign: "start" },
  "& > :nth-of-type(n + 4)": {
    display: { xs: "block", sm: "none", md: "block" },
  },
  "& > :nth-of-type(n + 5)": {
    display: { xs: "block", sm: "none", lg: "block" },
  },
  "& > :nth-of-type(n + 7)": { display: { xs: "block", sm: "none" } },
};

const CardGrid = ({ children, singleRow = false }: CardGridProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
          lg: "repeat(6, minmax(0, 1fr))",
        },
        gap: "8px",
        ...(singleRow && singleRowSx),
      }}
    >
      {children}
    </Box>
  );
};

export default CardGrid;
