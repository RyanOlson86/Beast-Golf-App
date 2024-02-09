import React, { useState } from "react";
import {
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Input,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const columns = [
  {
    field: "player1",
    headerName: "Player 1",
    width: 150,
    // editable: true,
  },
  {
    field: "player2",
    headerName: "Player 2",
    width: 150,
    // editable: true,
  },
  {
    field: "penalty",
    headerName: "Penalty",
    width: 110,
    // editable: true,
  },
  {
    field: "score",
    headerName: "Net Score",
    width: 150,
    // editable: true,
  },
];

function PlayerList2({ teams, event_id }) {
  //   const events = useSelector(store => store.events)
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [scoreInput, setScore] = useState(0);

  const handleUpdate = (event) => {
    // history.push(`/events/${rowId}`)
    console.log("clicked", event.target.id, scoreInput, event_id);
    dispatch({
      type: "UPDATE_SCORE",
      payload: {
        event_id: event_id,
        team_id: event.target.id,
        score: scoreInput,
      },
    });
    setScore(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player 1</TableCell>
            <TableCell align="left">Player 2</TableCell>
            <TableCell align="left">Penalty</TableCell>
            <TableCell align="left">Score</TableCell>
            <TableCell align="center">Update Score</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.player1}
              </TableCell>
              <TableCell align="left">{row.player2}</TableCell>
              <TableCell align="left">{row.penalty}</TableCell>
              <TableCell align="left">{row.score}</TableCell>
              <TableCell align="center">
                <TextField variant="outlined" value={scoreInput} type="number" onChange={(event) => setScore(event.target.value)} />
              </TableCell>
              <TableCell align="left">
                <Button id={row.id} variant="contained" color="secondary" onClick={handleUpdate}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayerList2;
