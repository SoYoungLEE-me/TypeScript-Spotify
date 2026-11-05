import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
  singleRow?: boolean;
}

const singleRowSx = {
  "& > :nth-of-type(n + 3)": { display: { xs: "none", sm: "block" } },
  "& > :nth-of-type(n + 4)": { display: { xs: "none", md: "block" } },
  "& > :nth-of-type(n + 5)": { display: { xs: "none", lg: "block" } },
  "& > :nth-of-type(n + 7)": { display: "none" },
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
