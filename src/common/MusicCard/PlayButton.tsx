import { IconButton, styled } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const StyledPlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#000",
  width: "44px",
  height: "44px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "scale(1.06)",
  },
}));

const PlayButton = () => {
  return (
    <StyledPlayButton aria-label="play">
      <PlayArrowIcon />
    </StyledPlayButton>
  );
};

export default PlayButton;
