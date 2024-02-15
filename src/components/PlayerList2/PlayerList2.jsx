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

function PlayerList2({ teams, event_id, complete}) {

  return (
    <TableContainer component={Paper} sx={{ width: '90%', m: '5%', border: 'solid 1px grey', borderRadius: '5px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player 1</TableCell>
            <TableCell align="left">Player 2</TableCell>
            <TableCell align="center">Penalty</TableCell>
            <TableCell align="center">Score</TableCell>
            {complete ==false && <TableCell align="center">Update Score</TableCell>}
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
              <TableCell align="center">{row.penalty}</TableCell>
              <TableCell align="center">{row.score}</TableCell>
              {complete ==false && <UpdateScoreInput row_id={row.id} event_id={event_id} />}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayerList2;
