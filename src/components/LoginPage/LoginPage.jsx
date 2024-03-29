import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <LoginForm />
      <Button
        variant="outlined"
        sx={{ m: "2%" }}
        onClick={() => {
          history.push("/registration");
        }}
      >
        Register
      </Button>
    </Box>
  );
}

export default LoginPage;
