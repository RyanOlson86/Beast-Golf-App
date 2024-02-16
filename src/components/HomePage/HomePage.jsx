import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import MyImageList from "../MyImageList/MyImageList";
import genStyle from "../Styles/Styles";

function HomePage() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <center>
        <Box sx={{ display: "flex", width: "90%", textAlign: 'justify', marginBottom: 10, ...genStyle.box}}>
          <Box sx={{ width: "60%", p: 3 }}>
            <Typography variant="h4">Welcome to the BGA!</Typography>
            <Typography variant="p">
              The Beast Golf Association (BGA) was started in 2019 when a group of friends decided to form their own golf league,
              playing 2-person scramble format to promote a level playing field while promoting comradery and competition amongst
              the group. The BGA quickly grew as others friends and family members joined the weekly rounds of golf and now over
              230 different players have played in the BGA in over 100 events!
            </Typography>
          </Box>
          <Box sx={{ maxWidth: "600px", p: 3 }}>
            <img src="public/images/Screenshot 2024-02-15 at 10.47.24 AM.png" />
          </Box>
        </Box>
      </center>
      <center>
        <MyImageList />
      </center>
    </>
  );
}

export default HomePage;
