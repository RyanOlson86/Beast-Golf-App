import React, { useState } from "react";
import { Button, Typography, Select, TextField, Box, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function AddPlayers() {
  // Using hooks create local state for form inputs
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const dispatch = useDispatch();
  const players = useSelector((store) => store.players);

  // Function to reset Form Inputs to default
  const defaultInputs = () => {
    setPlayerOne("");
    setPlayerTwo("");
  };

  // Function to Handle Add
  const handleAdd = () => {
    // dispatch({type: 'ADD_EVENT', payload: {
    //     course: courseInput,
    //     date: dateInput,
    //     teebox: teeboxInput,
    //     format: formatInput
    // }})
    defaultInputs();
  };

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

      <FormControl>
        <InputLabel>Player One</InputLabel>
        <Select value={playerOne} onChange={(event) => setPlayerOne(event.target.value)}>
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {player.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Player Two</InputLabel>
        <Select value={playerTwo} onChange={(event) => setPlayerTwo(event.target.value)}>
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {player.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleAdd}>
        ADD
      </Button>
    </Box>
  );
}

export default AddPlayers;
