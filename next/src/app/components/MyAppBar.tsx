"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { UserButton } from "@clerk/nextjs";

export const PAGES = {
  HOME: {
    href: "/",
    label: "Home",
  },
  PRICING: {
    href: "/pricing",
    label: "Pricing",
  },
  BLOG: {
    href: "/blog",
    label: "Blog",
  },
  ABOUT: {
    href: "/about",
    label: "About",
  },
};

export const appName = "XpenseTrackr";

function MyAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorElNav) {
      setAnchorElNav(null);
    } else {
      setAnchorElNav(event.currentTarget);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={PAGES.HOME.href}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appName}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleNavMenu}
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
              onClose={handleNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.values(PAGES).map((page) => (
                <MenuItem
                  key={page.label}
                  component="a"
                  href={page.href}
                  onClick={handleNavMenu}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={PAGES.HOME.href}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.values(PAGES).map((page) => (
              <Button
                key={page.label}
                href={page.href}
                onClick={handleNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <UserButton afterSignOutUrl="/" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MyAppBar;
