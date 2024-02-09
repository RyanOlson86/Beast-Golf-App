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
import UpdateScoreInput from "../UpdateScoreInput/UpdateScoreInput";

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
              <UpdateScoreInput row_id={row.id} event_id={event_id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayerList2;
