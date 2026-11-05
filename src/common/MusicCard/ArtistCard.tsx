import { Link } from "react-router";
import { Box, Typography } from "@mui/material";
import CoverImage from "../components/CoverImage";

interface ArtistCardProps {
  name: string;
  image?: string;
}

const ArtistCard = ({ name, image }: ArtistCardProps) => {
  return (
    <Link
      to={`/search/${encodeURIComponent(name)}?type=track`}
      style={{ minWidth: 0 }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: "8px",
          textAlign: "center",
          transition: "background-color 0.2s ease",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <CoverImage src={image} alt={name} size="100%" radius="50%" />
        <Typography noWrap fontWeight={700} title={name} sx={{ mt: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          아티스트
        </Typography>
      </Box>
    </Link>
  );
};

export default ArtistCard;
