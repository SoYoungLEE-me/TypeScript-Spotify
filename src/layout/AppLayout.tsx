import { Suspense } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { styled, Box, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./components/LibraryHead";
import Navbar from "./components/Navbar";
import LoadingSpinner from "../common/components/LoadingSpinner";
import ErrorMessage from "../common/components/ErrorMessage";
import Library from "./components/Library";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "10px",
  gap: "12px",
  boxSizing: "border-box",
  overflow: "hidden",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "250px",
  display: "flex",
  flexShrink: 0,
  flexGrow: 0,
  flexDirection: "column",
  gap: "8px",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: "16px",
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  color: theme.palette.text.secondary,
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  const location = useLocation();

  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <li style={{ marginBottom: "17px" }}>
              <StyledNavLink to="/" end>
                <HomeIcon />
                <Typography variant="h2" fontWeight={700}>
                  Home
                </Typography>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/search">
                <SearchIcon />
                <Typography variant="h2" fontWeight={700}>
                  Search
                </Typography>
              </StyledNavLink>
            </li>
          </NavList>
        </ContentBox>

        <ContentBox
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>

      <ContentBox
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          padding: "0 20px 20px",
        }}
      >
        <Navbar />
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                resetKeys={[location.pathname]}
                fallback={
                  <ErrorMessage errorMessage="데이터를 불러오지 못했어요." />
                }
              >
                <Suspense
                  fallback={
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LoadingSpinner />
                    </Box>
                  }
                >
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Box>
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;
