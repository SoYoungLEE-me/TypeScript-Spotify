import { Outlet } from "react-router";
import { styled, Box } from "@mui/material";
import { NavLink } from "react-router";

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
  marginTop: "20px",
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "17px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/" end>
              HOME
            </StyledNavLink>
            <StyledNavLink to="/search">SEARCH</StyledNavLink>
          </NavList>
        </ContentBox>
      </Sidebar>
      <Outlet />
    </Layout>
  );
};

export default AppLayout;
