import { Box } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { data: userProfile, isLoading } = useGetCurrentUserProfile();

  const renderRight = () => {
    if (isLoading) return null; //로그인 여부 확인 중에는 아무것도 안보여주기
    if (userProfile) return <ProfileMenu />;
    return <LoginButton />;
  };

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
      {renderRight()}
    </Box>
  );
};

export default Navbar;
