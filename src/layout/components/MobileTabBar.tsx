import { NavLink } from "react-router";
import { Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

const TABS = [
  { to: "/", label: "홈", icon: <HomeIcon />, end: true },
  { to: "/search", label: "검색", icon: <SearchIcon />, end: false },
  {
    to: "/library",
    label: "내 라이브러리",
    icon: <LibraryMusicIcon />,
    end: false,
  },
];

const MobileTabBar = () => (
  <Box
    component="nav"
    sx={{
      display: { xs: "flex", sm: "none" },
      flexShrink: 0,
      borderRadius: "8px",
      bgcolor: "background.paper",
    }}
  >
    {TABS.map((tab) => (
      <Box
        key={tab.to}
        component={NavLink}
        to={tab.to}
        end={tab.end}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.25,
          py: 1,
          color: "text.secondary",
          textDecoration: "none",
          "&.active": { color: "text.primary" },
        }}
      >
        {tab.icon}
        <Typography variant="body2" sx={{ fontSize: "11px", fontWeight: 700 }}>
          {tab.label}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default MobileTabBar;
