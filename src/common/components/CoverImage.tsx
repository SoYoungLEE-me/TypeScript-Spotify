import { Box } from "@mui/material";

interface CoverImageProps {
  src?: string;
  alt?: string;
  size: number | string; //부모 너비만큼
  radius?: number | string;
  shadow?: boolean;
}

// 사진이 없으면 회색 칸으로 대신
const CoverImage = ({
  src,
  alt = "",
  size,
  radius = "4px",
  shadow = false,
}: CoverImageProps) => {
  return (
    <Box
      sx={{
        width: size,
        aspectRatio: "1 / 1",
        flexShrink: 0,
        borderRadius: radius,
        overflow: "hidden",
        bgcolor: "action.active",
        boxShadow: shadow ? "0 12px 32px rgba(0, 0, 0, 0.5)" : "none",
      }}
    >
      {src && (
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
    </Box>
  );
};

export default CoverImage;
