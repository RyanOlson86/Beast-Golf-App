import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import UpdateScoreInput from "../UpdateScoreInput/UpdateScoreInput";

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
