import React from "react";
import "./Footer.css";
import { Box } from "@mui/material";
import genStyle from "../Styles/Styles";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

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
