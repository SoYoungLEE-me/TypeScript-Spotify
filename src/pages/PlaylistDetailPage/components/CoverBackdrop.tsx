import { Box } from "@mui/material";

interface CoverBackdropProps {
  coverUrl?: string;
}

const CoverBackdrop = ({ coverUrl }: CoverBackdropProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        maxHeight: 640,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          transform: "scale(1.3)",
          filter: "blur(40px) brightness(0.55)",
          background: coverUrl
            ? `url("${coverUrl}") center / cover`
            : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.background.paper})`,
        })}
      />
      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${theme.palette.background.paper})`,
        })}
      />
    </Box>
  );
};

export default CoverBackdrop;
