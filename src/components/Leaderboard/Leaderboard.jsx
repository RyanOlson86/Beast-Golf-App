import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PlayerModal from "../PlayerModal/PlayerModal";
import axios from "axios";

const columns = [
  {
    field: "full_name",
    headerName: "Name",
    width: 150,
    // editable: true,
  },
  {
    field: "events_played",
    headerName: "Events",
    width: 150,
    // editable: true,
  },
  {
    field: "wins",
    headerName: "Wins",
    width: 110,
    // editable: true,
  },
];

function Leaderboard() {
  const players = useSelector((store) => store?.players);
  const user = useSelector((store) => store?.user);

  // Local State for Modal control
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Local State for player details selected from Leaderboard
  const [playerDetails, setPlayerDetails] = useState([]);
  const [playerName, setPlayerName] = useState("");

  // Local State for UserDetails
  const userDetails = players.filter(player => player.id === user.player_id)

  const fetchDetails = (id, name) => {
    axios
      .get(`api/details/${id}`)
      .then((response) => {
        setPlayerDetails(response.data);
        if (name != undefined) {
          setPlayerName(name);
        }
      })
      .catch((error) => {
        console.log("Error in fetchDetails", error);
      });
  };

  return (
    <Box sx={{ height: 600, width: "90%", m: "5%" }}>
      {user.player_id && (
        <Box sx={{marginBottom: '5%'}}>
          <Typography variant="h4" >Welcome {userDetails[0]?.full_name}!</Typography>
          <Typography variant="h6" >You have played <b>{userDetails[0]?.events_played}</b> events with <b>{userDetails[0]?.wins}</b> wins!</Typography>
        </Box>
      )}
      <Typography variant="h5">Leaderboard:</Typography>
      <DataGrid
        rows={players}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: "events_played", sort: "desc" }],
          },
        }}
        onRowClick={(params) => {
          console.log(params);
          fetchDetails(params.id, params.row.full_name);
          handleOpen();
        }}
      />
      {<PlayerModal name={playerName} handleClose={handleClose} open={open} playerDetails={playerDetails} />}
    </Box>
  );
}

export default Leaderboard;
