import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Grid, Typography } from "@mui/material";
import PlayerList from "../PlayerList/PlayerList";
import AddPlayers from "../AddPlayers/AddPlayers";

// Mock data
const mockData = [
  {
    id: 1,
    player1: "Ryan Olson",
    player2: "Josh Leary",
    penalty: 1,
    score: null,
  },
];

function ModifyEvents() {
  const dispatch = useDispatch();
  // Get event ID from useParams
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
    dispatch({ type: "FETCH_EVENT_DETAILS", payload: id });
  }, []);

  // Fetch all events from store
  const store = useSelector((store) => store);
  const events = store.events
  const user = store.user
  const teams = store.teams

  // Filter All events to specific event by ID
  const eventArray = events.filter((event) => event?.id == id);
  const eventDetails = eventArray[0];

  return (
    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h6">Course:</Typography>
          <Typography variant="h6">{eventDetails?.course}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Format:</Typography>
          <Typography variant="h6">{eventDetails?.format}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Tee Box:</Typography>
          <Typography variant="h6">{eventDetails?.teebox}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Date:</Typography>
          <Typography variant="h6">{new Date(eventDetails?.date).toLocaleDateString()}</Typography>
        </Grid>
      </Grid>
      {/* Add PlayerList component and pass event */}
      {user.access_level === 1 && <AddPlayers />}
      <PlayerList teams={teams} />
    </Box>
  );
}

export default ModifyEvents;
