import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MovieIcon from '@mui/icons-material/Movie';
import { ContentFilterContext } from "../../contexts/filteringContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = (props) => {
  const filterContext = useContext(ContentFilterContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies/" },
    { label: "TV", path: "/tv/" },
    { label: "People", path: "/people/" },
  ];

  const handleMenuSelect = (pageURL) => {
    filterContext.changePage();
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
      <Toolbar >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <IconButton
                  onClick={() => handleMenuSelect("Home")}
                  color="inherit"
                ><MovieIcon  /> MovieTMDB Client </IconButton>
          </Typography>

            {isMobile ? (
              <>
              <Box sx={{ flexGrow: 20}} >
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
                </Box>
              </>
            ) : (
              <Box sx={{ flexGrow: 20}} >
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </Box>
            )}
            
          <Box>
          <Tooltip title="Toggle Site Theme">
          {
          props.theme === props.lightMode ? (<IconButton
            onClick={props.changeTheme}
            color="white"
          ><DarkModeIcon  /></IconButton>) 
          : 
          <IconButton
            onClick={props.changeTheme}
            color="white"
          ><LightModeIcon  /></IconButton>
          }
          </Tooltip>
          </Box>
          
        </Toolbar>
      </AppBar>
      <Offset/>
    </>
  );
};

export default SiteHeader;