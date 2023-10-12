import { Outlet, Link } from "react-router-dom";
import NavbarMain from "scenes/navbar";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

const MainPage = () => {
  const isLargeScreens = useMediaQuery("(min-width: 1000px)");
  const isMediumScreens = useMediaQuery("(min-width: 640px)");
  const dispatch = useDispatch();
  const { palette } = useTheme();
  return (
    <div>
      <div className="head">
        <h1 className="head_text">Dee Dee's Doggie Jerseys</h1>
        <h1 className="dark_layer"></h1>
      </div>
      <NavbarMain />
      <Outlet />
      <footer style={{ flexDirection: isMediumScreens ? "row" : "column" }}>
        <div>© Dee Dee's Doggie Jerseys 2023</div>
        <div>
          Developed by{" "}
          <a className="footer-link" href="https://toby-nortje.co.za">
            Toby Nortje
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
