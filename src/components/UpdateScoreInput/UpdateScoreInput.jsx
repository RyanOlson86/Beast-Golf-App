import React, { useState } from "react";
import { Button, TableCell, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

function UpdateScoreInput({ row_id, event_id }) {
  const [scoreInput, setScore] = useState("");
  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    console.log("clicked", event.target.id, scoreInput, event_id);
    dispatch({
      type: "UPDATE_SCORE",
      payload: {
        event_id: event_id,
        team_id: event.target.id,
        score: scoreInput,
      },
    });
    setScore("");
  };

  return (
    <>
      <TableCell align="center">
        <TextField variant="outlined" value={scoreInput} type="number" onChange={(event) => setScore(event.target.value)} />
      </TableCell>
      <TableCell align="left">
        <Button id={row_id} variant="contained" color="secondary" onClick={handleUpdate}>
          Update
        </Button>
      </TableCell>
    </>
  );
}

export default UpdateScoreInput;
