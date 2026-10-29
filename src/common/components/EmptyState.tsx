import type { ReactNode } from "react";
import { Typography } from "@mui/material";

interface EmptyStateProps {
  children: ReactNode;
}

const EmptyState = ({ children }: EmptyStateProps) => {
  return (
    <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
      {children}
    </Typography>
  );
};

export default EmptyState;
