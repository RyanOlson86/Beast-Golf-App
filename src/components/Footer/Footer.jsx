import React from "react";
import "./Footer.css";
import { Box } from "@mui/material";
import genStyle from "../Styles/Styles";

function Footer() {
  return (
    <footer>
      <center>
        <Box sx={{ ...genStyle.box, width: "fit-content", p:2, opacity: .7}}>
          &copy; Ryan Olson
          </Box>
      </center>
    </footer>
  );
}

export default Footer;
