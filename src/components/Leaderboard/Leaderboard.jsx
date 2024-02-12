import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PlayerModal from "../PlayerModal/PlayerModal";

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
  const events = useSelector((store) => store.events);
  const players = useSelector((store) => store.players);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'FETCH_ALL_PLAYERS'})
  }, [])

  // Local state that is updated when a row is clicked on event list
  const [rowId, setRowId] = useState(0);

  return (
    <Box sx={{ height: 400, width: "100%", m: "20px" }}>
      <Typography variant="h5">Upcoming Events:</Typography>
      <DataGrid
        rows={players}
        columns={columns}
        onRowClick={(params)=> {
          setRowId(params.id) 
          open ? setOpen(false) : setOpen(true)
        }}

      />
      {<PlayerModal handleClose={handleClose} open={open} rowId={rowId}/>}
    </Box>
  );
}

export default Leaderboard;
