import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

function AddPlayers() {
  // Using hooks create local state for form inputs
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const dispatch = useDispatch()

  // Function to reset Form Inputs to default
  const defaultInputs = () => {
    setPlayerOne('');
    setPlayerTwo('');
  }

  // Function to Handle Add
  const handleAdd = () => {
    console.log(playerOne)
    console.log(playerTwo)

    // dispatch({type: 'ADD_EVENT', payload: {
    //     course: courseInput,
    //     date: dateInput,
    //     teebox: teeboxInput,
    //     format: formatInput
    // }})
    defaultInputs();
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 0, width: "20ch" },
        m: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">Add Players:</Typography>
      <TextField
        id="player-one"
        label="Player 1"
        variant="outlined"
        size="small"
        value={playerOne}
        onChange={(event) => setPlayerOne(event.target.value)}
      />
      <TextField
        id="player-two"
        label="Player 2"
        variant="outlined"
        size="small"
        value={playerTwo}
        onChange={(event) => setPlayerTwo(event.target.value)}
      />
      
      <Button variant="contained" onClick={handleAdd}>ADD</Button>
    </Box>
  );
}

export default AddPlayers;
