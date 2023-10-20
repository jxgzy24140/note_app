import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
const UserMenu = () => {
  const { user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const auth = getAuth();
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <Typography>{user.displayName}</Typography>
        <Avatar
          alt="avatar"
          src={user.photoURL}
          sx={{ width: "24px", height: "24px" }}
        />
      </Box>
      <Menu
        open={anchorEl != null && true}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
