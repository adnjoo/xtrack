"use client";

import * as React from "react";
import NextLink from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { UserButton } from "@clerk/nextjs";

import { APP_NAME, PAGES } from "@/app/lib/constants";

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
            component={NextLink}
            href={PAGES.HOME.href}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {APP_NAME}
          </Typography>

          {/* Mobile Menu */}
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
                  component={NextLink}
                  key={page.label}
                  href={page.href}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={NextLink}
            href={PAGES.HOME.href}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {APP_NAME}
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.values(PAGES).map((page) => (
              <Link
                component={NextLink}
                key={page.label}
                href={page.href}
                sx={{ mx: 1, color: "white", display: "block" }}
              >
                {page.label}
              </Link>
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
