import { Box } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "64px",
        flexShrink: 0,
      }}
    >
      {userProfile ? <ProfileMenu /> : <LoginButton />}
    </Box>
  );
};

export default Navbar;
