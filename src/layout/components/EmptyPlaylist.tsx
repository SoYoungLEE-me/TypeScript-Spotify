import { Button, Card, styled, Typography } from "@mui/material";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  backgroundImage: "none",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "8px",
}));

const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
        It's easy, we'll help you
      </Typography>
      <Button variant="contained" color="secondary" sx={{ fontWeight: 700 }}>
        Create playlist
      </Button>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;
