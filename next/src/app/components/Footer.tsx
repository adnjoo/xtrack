"use client";

import NextLink from "next/link";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { APP_NAME, FOOTER } from "@/app/lib/constants";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "absolute",
        bottom: 0,
        py: 3,
        px: 2,
        mt: "auto",
        background: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {Object.keys(FOOTER).map((key) => (
          <Link
            key={key}
            component={NextLink}
            color="inherit"
            href={FOOTER[key].href}
            sx={{ mx: 1 }}
          >
            {FOOTER[key].label}
          </Link>
        ))}
      </Typography>
    </Box>
  );
}

export default Footer;
