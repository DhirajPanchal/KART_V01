import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import UserService from "../../service/UserService";
//cfd8dc , #2F90B0, 1c5669

type PageType = {
  label: string;
  route: string;
};

const PAGE_LINKS: PageType[] = [
  { label: "S T O R E", route: "/store" },
  { label: "I N V E N T O R Y", route: "/inventory" },
];

const settings = ["Profile", "Logout"];

const navLink = "navLink";
const navLinkActive = "navLinkActive";
export default function Header() {
  let pages: PageType[] = [...PAGE_LINKS];
  let pagesMobile: PageType[] = !UserService.isLoggedIn()
    ? [...PAGE_LINKS, { label: "LOGIN", route: "LOGIN_MENU" }]
    : [...PAGE_LINKS];
  const navigation = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: PageType) => {
    setAnchorElNav(null);
    //console.log("NAV ::::: " + page);
    if (page.route === "LOGIN_MENU") {
      handleLogin();
      //console.log("A");
    } else if (page.route !== "") {
      //console.log("B");
      navigation(page.route);
    }
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    console.log("USER MENU :: " + setting);
    if (setting === "Profile") {
      navigation("/profile");
    } else if (setting === "Logout") {
      handleLogout();
    }
  };

  const handleLogin = () => {
    console.log("Login ::");
    UserService.doLogin();
  };

  const handleLogout = () => {
    console.log("Logout ::");
    navigation("/");
    UserService.doLogout();
  };

  const handleAuth = () => {
    console.log("_B3 - Info");
    console.log(" Name : " + UserService.getUsername());
    console.log("-----");
    console.log(" Parsed : " + UserService.getTokenParsed());
    console.log("-----");
    console.log(" Token : " + UserService.getToken());
    console.log("-----");
    console.log(" isLoggedIn : " + UserService.isLoggedIn());
    console.log("-----");
    console.log(" Role STORE : " + UserService.hasRole(["STORE"]));
    console.log("-----");
    console.log(" Role OPERATIONS : " + UserService.hasRole(["OPERATIONS"]));
    console.log("-----");
    console.log(" Role XXX : " + UserService.hasRole(["XXX"]));
  };

  return (
    <AppBar
      position="static"
      sx={{
        color: "black",
        backgroundColor: "#E0F7FA",
        boxShadow: "0px 0px 0px 0px",
        p: 0,
        borderBottom: 1,
        borderBottomColor: "#00838f",
      }}
    >
      {/*  
      -  -  -  -  -   Container  -  -  -  -  -   
      */}
      <Container maxWidth="xl" sx={{}}>
        {/*  
        -  -  -  -  -   TOOLBAR   -  -  -  -  -   
        */}
        <Toolbar disableGutters sx={{ columnGap: 4 }} variant="regular">
          {/*  
          -  -  -  -  -   LOGO (laptop)   -  -  -  -  -   
          */}
          <Box
            component="img"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            src="/cart-header.jpg"
            onClick={() => handleCloseNavMenu({ label: "Home", route: "/" })}
          />
          {/*  
          -  -  -  -  -   MENU (mobile)   -  -  -  -  -   
          */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu({ label: "", route: "" })}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pagesMobile.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/*  
          -  -  -  -  -   LOGO (mobile)   -  -  -  -  -   
          */}
          <Box
            component="img"
            sx={{ display: { xs: "flex", md: "none" } }}
            src="/cart-header.jpg"
            onClick={() => handleCloseNavMenu({ label: "Home", route: "/" })}
          />
          {/*  
          -  -  -  -  -   MENU (laptop)   -  -  -  -  -   
          */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              columnGap: 4,
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page.label}
                to={page.route}
                className={({ isActive }) =>
                  isActive ? navLinkActive : navLink
                }
              >
                {page.label}
              </NavLink>
            ))}
          </Box>
          <IconButton
            sx={{ fontWeight: "bold", fontSize: 16 }}
            onClick={handleAuth}
          >
            AUTH
          </IconButton>
          {/* // - - - - - LOGIN - - - - - */}

          {UserService.isLoggedIn() === false ? (
            <Box sx={{ display: { xs: "none", md: "flex", columnGap: 24 } }}>
              <IconButton
                sx={{ color: "#00838f", fontWeight: "bold", fontSize: 16 }}
                onClick={handleLogin}
              >
                L O G I N
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#1c5669" }}>
                    {" "}
                    {UserService.getUserAvatarName()}{" "}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu("")}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
