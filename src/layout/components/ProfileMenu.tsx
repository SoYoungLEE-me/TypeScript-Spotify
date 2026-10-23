import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useQueryClient } from "@tanstack/react-query";

const ProfileMenu = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");

    queryClient.setQueryData(["current-user-profile"], null);
    handleClose();
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="profile menu">
        <Avatar
          src={user.images?.[0]?.url}
          alt={user.display_name}
          sx={{ bgcolor: "primary.main" }}
        >
          {user.display_name?.[0]}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>{user.display_name}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
