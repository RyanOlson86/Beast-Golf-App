import { TextField, Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const myStyle = {
    backgroundColor: "white",
    borderRadius: "5px",
  };

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <Box
      component="form"
      sx={{
        bgcolor: "#d1d1d1",
        borderRadius: "5px",
        border: "solid 1px grey",
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "1%",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" sx={{ m: 1 }}>
        Login:
      </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          type="text"
          required
          autoComplete="true"
          sx={myStyle}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          variant="outlined"
          sx={myStyle}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Box>
      <Button variant="contained" size="large" onClick={login}>
        Login
      </Button>
    </Box>
  );
}

export default LoginForm;
