import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Box, Button } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const myStyle = {
    backgroundColor: "white",
    borderRadius: "5px",
  };

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

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
        Register User:
      </Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
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
          sx={myStyle}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          variant="outlined"
          sx={myStyle}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Box>
      <Button variant="contained" size="large" onClick={registerUser}>
        Register
      </Button>
    </Box>
  );
}

export default RegisterForm;
