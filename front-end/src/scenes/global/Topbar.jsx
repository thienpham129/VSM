import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { removeTokenFromLocalStorage } from "utils/tokenUtils";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setShowDropdown(true);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    window.location.href = "/login";
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        <Box position="relative">
          <IconButton onClick={handleOpenDropdown} onBlur={handleCloseDropdown}>
            <PersonOutlinedIcon />
          </IconButton>
          {showDropdown && (
            <Box
              position="absolute"
              top="40px"
              right="0"
              bgcolor={colors.primary[400]}
              boxShadow={3}
              borderRadius="5px"
              p={1}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur on click inside
            >
              <Box
                p={1}
                sx={{
                  cursor: "pointer",
                  whiteSpace: "nowrap", // Giữ nội dung trên một dòng
                  textAlign: "center", // Căn giữa chữ
                }}
                // onClick={() => alert("Đăng xuất")}
              >
                <div onClick={handleLogout}>Đăng xuất</div>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
