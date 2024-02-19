import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";

import PlayerModal from "../PlayerModal/PlayerModal";
import genStyle from "../Styles/Styles";
import BackButton from "../BackButton/BackButton";

const columns = [
  {
    field: "full_name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "events_played",
    headerName: "Events",
    width: 150,
  },
  {
    field: "wins",
    headerName: "Wins",
    width: 110,
  },
];

function Leaderboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PLAYERS" });
  }, []);

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
  const userDetails = players.filter((player) => player.id === user.player_id);

  // Axios request for individual player details for last 10 events
  const fetchDetails = (id, name) => {
    axios
      .get(`api/details/${id}`)
      .then((response) => {
        console.log("details response", response.data);
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
    <>
      <BackButton text={"HOME"} path={"/home"} icon={<HomeIcon />} sxStyle={genStyle.topBtn} />
      <BackButton text={"EVENTS"} path={"/events"} icon={<GolfCourseIcon />} sxStyle={genStyle.topBtn} />

      <Box sx={{ ...genStyle.box, height: 600, width: "90%", m: "5%", paddingBottom: "205px" }}>
        {user.player_id && (
          <Box sx={{ marginBottom: "5%" }}>
            <Typography variant="h4">Welcome {userDetails[0]?.full_name}!</Typography>
            <Typography variant="h6">
              You have played <b>{userDetails[0]?.events_played}</b> events with <b>{userDetails[0]?.wins}</b> wins!
            </Typography>
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
          filterModel={{
            items: [{ field: "complete", operator: "is", value: "true" }],
          }}
          onRowClick={(params) => {
            console.log(params);
            fetchDetails(params.id, params.row.full_name);
            handleOpen();
          }}
        />
        {<PlayerModal name={playerName} handleClose={handleClose} open={open} playerDetails={playerDetails} />}
      </Box>
    </>
  );
}

export default Leaderboard;
