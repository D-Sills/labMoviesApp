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
import { AuthenticationContext } from "../../contexts/authenticationContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import RegisterModal from "../authentication/register";
import LoginModal from "../authentication/login";
import ResetModal from "../authentication/reset";
import AccountMenu from "../accountMenu";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = (props) => {
  const filterContext = useContext(ContentFilterContext);
  const authContext = useContext(AuthenticationContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openBurgerMenu = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = useState(null);
  const openAccountMenu = Boolean(anchorE2);
  const theme = useTheme(props.theme);
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

  const handleBurgerMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleAccountMenu = (event) => {
    setAnchorE2(event.currentTarget);
  };

  return (
    <>
    <div  color="neutral">
      <AppBar position="fixed" color="neutral">
      <Toolbar color="neutral">
          <Typography variant="h4" sx={{ flexGrow: 1 }}
          style={{color: '#B2BAC2'}}>
          <IconButton
                  onClick={() => handleMenuSelect("Home")}
                  color="inherit"
                ><MovieIcon color ="title" /> MovieTMDB Client </IconButton>
          </Typography>

            {isMobile ? (
              <>
              <Box sx={{ flexGrow: 20}} >
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleBurgerMenu}
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
                  open={openBurgerMenu}
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
          ><DarkModeIcon  color="basicText"/></IconButton>) 
          : 
          <IconButton
            onClick={props.changeTheme}
          ><LightModeIcon  color="basicText"/></IconButton>
          }
          </Tooltip>
          {
          authContext.user ? (
          <IconButton
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleAccountMenu}
          color="inherit"
          >
          <Avatar sx={{ backgroundColor: 'red' }}>
          </Avatar>
          </IconButton>
          
          ) : 
          <Button
            key="Login"
            color="inherit" 
            onClick={() => authContext.setModalIndex(1)}
          >Login
          </Button>
          }
          </Box>
          
          {
          !openAccountMenu ? (null) :
          <div 
          style = {{
          border: 'solid 10px transparent',
          borderBottomColor: 'white',
          position: 'absolute',
          top: '42px',
          right: '42px',
          }}></div>
          }
          <Menu
            sx={{
              marginTop: '46px',
            }}
            id="menu-appbar"
            anchorEl={anchorE2}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openAccountMenu}
            onClose={() => setAnchorE2(null)}
          >
          <AccountMenu anchor = {setAnchorE2} context = {authContext}/>
          </Menu>
          
          <LoginModal context={authContext} setIndex={authContext.setModalIndex} index={authContext.modalIndex}/>
          <RegisterModal context={authContext} setIndex={authContext.setModalIndex} index={authContext.modalIndex}/>
          <ResetModal context={authContext} setIndex={authContext.setModalIndex} index={authContext.modalIndex}/>
          
        </Toolbar>
      </AppBar>
      <Offset/>
      </div>
    </>
  );
};

export default SiteHeader;