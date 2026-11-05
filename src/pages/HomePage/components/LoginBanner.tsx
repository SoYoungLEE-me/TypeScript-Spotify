import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getSpotifyAuthUrl } from "../../../utils/auth/auth";

const LoginBanner = () => (
  <Box
    component="section"
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { xs: "flex-start", sm: "center" },
      gap: 2,
      p: 3,
      mb: { xs: 6, md: 7 },
      borderRadius: "12px",
      border: 1,
      borderColor: "primary.main",
      bgcolor: "rgba(255, 122, 69, 0.08)",
    }}
  >
    <Box sx={{ flex: 1 }}>
      <Typography variant="h1" sx={{ mb: 0.5 }}>
        로그인하면 내 취향이 보여요
      </Typography>
      <Typography color="text.secondary">
        자주 듣는 곡, 최근에 들은 곡, 내 플레이리스트를 홈에서 바로 볼 수 있어요
      </Typography>
    </Box>
    <Button
      variant="text"
      color="primary"
      endIcon={<ArrowForwardIcon />}
      onClick={() => getSpotifyAuthUrl()}
      sx={{
        fontWeight: 700,
        flexShrink: 0,
        "& .MuiButton-endIcon": { transition: "transform 0.2s ease" },
        "&:hover .MuiButton-endIcon": { transform: "translateX(4px)" },
      }}
    >
      로그인하고 내 기록 보기
    </Button>
  </Box>
);

export default LoginBanner;
