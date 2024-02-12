import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
  const players = useSelector((store) => store.players);
  const [open, setOpen] = useState(false);
  const [playerDetails, setPlayerDetails] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PLAYERS" });
  }, []);

  const fetchDetails = (id, name) => {
    axios
      .get(`api/details/${id}`)
      .then((response) => {
        setPlayerDetails(response.data);
        setPlayerName(name);
      })
      .catch((error) => {
        console.log("Error in fetchDetails", error);
      });
  };

  // Local state that is updated when a row is clicked on event list
  const [rowId, setRowId] = useState(0);

  return (
    <Box sx={{ height: 600, width: "100%", m: "20px" }}>
      <Typography variant="h5">Upcoming Events:</Typography>
      <DataGrid
        rows={players}
        columns={columns}
        onRowClick={(params) => {
          console.log(params);
          fetchDetails(params.id, params.row.full_name);
          // setRowId(params.id);
          handleOpen();
        }}
      />
      {<PlayerModal name={playerName} handleClose={handleClose} open={open} playerDetails={playerDetails} />}
    </Box>
  );
}

export default Leaderboard;
