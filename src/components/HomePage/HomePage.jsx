import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

function HomePage() {
  const user = useSelector((store) => store.user);

  return (
    <Box sx={{display: "flex"}}>
      <Box sx={{width: '70%', m: 5}}>
        <Typography variant="h4">Welcome to the BGA!</Typography>
        <Typography variant="p">
          The Beast Golf Association (BGA) was started in 2019 when a group of friends decided to form their own golf
          league, playing 2-person scramble format to promote a level playing field while promoting comradery and competition
          amongst the group. The BGA quickly grew as others friends and family members joined the weekly rounds of golf and now
          over 200 different players have played in the BGA.
        </Typography>
      </Box>
      <Box sx={{maxWidth: '380px', m: 5}}>
        <img src="images/BGA_LogoSeries-11 -broken tee.png" />
      </Box>
    </Box>
  );
}

export default HomePage;
