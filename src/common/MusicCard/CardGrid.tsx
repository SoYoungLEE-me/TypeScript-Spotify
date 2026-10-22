import { Box } from "@mui/material";
import type { ReactNode } from "react";

const CardGrid = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        },
        gap: "8px",
      }}
    >
      {children}
    </Box>
  );
};

export default CardGrid;
