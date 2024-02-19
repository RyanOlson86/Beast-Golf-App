import React from "react";
import { Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <RegisterForm />
      <Button
        variant="outlined"
        sx={{ m: "2%" }}
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </Button>
    </Box>
  );
}

export default RegisterPage;
