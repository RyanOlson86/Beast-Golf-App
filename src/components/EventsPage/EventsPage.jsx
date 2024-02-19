import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import genStyle from "../Styles/Styles";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import AddEvent from "../AddEvent/AddEvent";
import PastEvents from "../PastEvents/PastEvents";
import BackButton from "../BackButton/BackButton";

function EventsPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
  }, []);

  return (
    <>
      <BackButton text={'HOME'} path={'/home'} icon={<HomeIcon />} sxStyle={genStyle.topBtn}/>
      <BackButton text={'LEADERBOARD'} path={'/leaderboard'} icon={<EmojiEventsIcon />} sxStyle={genStyle.topBtn}/>
      {user.access_level === 1 && <AddEvent />}
      <UpcomingEvents />
      <PastEvents />
    </>
  );
}

export default EventsPage;
