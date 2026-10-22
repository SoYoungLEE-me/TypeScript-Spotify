import { Box, styled, Typography } from "@mui/material";
import PlayButton from "./PlayButton";

const CardContainer = styled("div")(({ theme }) => ({
  minWidth: 0,
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover .play-button": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const AlbumImage = styled("img")({
  width: "100%",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  borderRadius: "6px",
  display: "block",
});

const PlayButtonWrapper = styled("div")({
  position: "absolute",
  right: "8px",
  bottom: "8px",
  opacity: 0,
  transform: "translateY(8px)",
  transition: "all 0.2s ease",
});

const EllipsisText = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}) as typeof Typography;

interface CardProps {
  image?: string;
  name: string;
  artistName: string;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <Box sx={{ position: "relative", mb: 1 }}>
        <AlbumImage src={image} alt={name} />
        <PlayButtonWrapper className="play-button">
          <PlayButton />
        </PlayButtonWrapper>
      </Box>
      <EllipsisText fontWeight={700}>{name}</EllipsisText>
      <EllipsisText variant="body2" color="text.secondary">
        {artistName}
      </EllipsisText>
    </CardContainer>
  );
};

export default Card;
