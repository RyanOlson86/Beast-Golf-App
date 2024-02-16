import React, { useState } from "react";
import { Button, Typography, Select, TextField, Box, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function AddPlayers({ event_id }) {
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

  // Style for TextField
  const myStyle = {
    backgroundColor: "white",
    borderRadius: "5px",
  };

  // Function to Handle Add
  const handleAdd = () => {
    dispatch({
      type: "ADD_PLAYER_TO_EVENT",
      payload: {
        event_id: event_id,
        playerOneId: playerOne,
        playerTwoId: playerTwo,
      },
    });
    defaultInputs();
  };

  return (
    <Box
      component="form"
      sx={{
        bgcolor: "#d1d1d1",
        borderRadius: "5px",
        border: "solid 1px grey",
        m: "5%",
        width: 'fit-content',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: "1%",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">Add Players:</Typography>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "20ch" },
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <FormControl>
          <InputLabel>Player One</InputLabel>
          <Select value={playerOne} label="Player One" sx={myStyle} onChange={(event) => setPlayerOne(event.target.value)}>
            {players.map((player) => (
              <MenuItem key={player.id} value={player.id}>
                {player.full_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Player Two</InputLabel>
          <Select value={playerTwo} label="Player Two" sx={myStyle} onChange={(event) => setPlayerTwo(event.target.value)}>
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
    </Box>
  );
}

export default AddPlayers;
