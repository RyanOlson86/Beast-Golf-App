import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Grid, Typography, Button } from "@mui/material";
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
  const history = useHistory()
  // Get event ID from useParams
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
    dispatch({ type: "FETCH_EVENT_DETAILS", payload: id });
    dispatch({ type: "FETCH_ALL_PLAYERS" });
  }, []);

  // Fetch all events from store
  const store = useSelector((store) => store);
  const events = store.events;
  const user = store.user;
  const teams = store.teams;

  // Filter All events to specific event by ID
  const eventArray = events.filter((event) => event?.id == id);
  const eventDetails = eventArray[0];

  const handleComplete = () => {
    dispatch({ type: "COMPLETE_EVENT", payload: id });
    history.push('/events');
  };

  return (
    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
      <Grid container spacing={1} sx={{justifyContent: 'center'}}>
        <Grid item xs={2}>
          <Typography variant="h6">Course:</Typography>
          <Typography variant="h6">{eventDetails?.course}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Format:</Typography>
          <Typography variant="h6">{eventDetails?.format}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Tee Box:</Typography>
          <Typography variant="h6">{eventDetails?.teebox}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Date:</Typography>
          <Typography variant="h6">{new Date(eventDetails?.date).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={2}>
          {user.access_level === 1 && (
            <Button variant="contained" color="secondary" size="small" sx={{ m: "10px" }} onClick={handleComplete}>
              Mark Event Complete
            </Button>
          )}
        </Grid>
      </Grid>
      {/* Add PlayerList component and pass event */}
      {user.access_level === 1 && <AddPlayers event_id={id} />}
      <PlayerList teams={teams} />
    </Box>
  );
}

export default ModifyEvents;
