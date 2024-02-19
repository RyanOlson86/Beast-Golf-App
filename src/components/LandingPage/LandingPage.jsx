import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { Button, Box, Grid } from "@mui/material";
import genStyle from "../Styles/Styles";
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <Grid container spacing={5} sx={{p: 5}}>
      <Grid item xs={8}>
        <Box sx={{...genStyle.box, height: 350}}>
          <h2>Welcome to the BGA!</h2>
          <p>
            The Beast Golf Association (BGA) was started in 2019 when a group of friends decided to form their own golf league,
            playing 2-person scramble format to promote a level playing field while promoting comradery and competition amongst
            the group. The BGA quickly grew as others friends and family members joined the weekly rounds of golf and now over 200
            different players have played in the BGA.
          </p>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{...genStyle.box, height: 350}}>
          <center>
            <RegisterForm />
          </center>
          <center>
            <h4>Already a Member?</h4>
            <Button variant="outlined" sx={{ m: "2%" }} onClick={onLogin}>
              Login
            </Button>
          </center>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
