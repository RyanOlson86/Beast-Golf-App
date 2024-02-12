import React, { useEffect } from "react";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import AddEvent from "../AddEvent/AddEvent";
import { useSelector, useDispatch } from "react-redux";
import PastEvents from "../PastEvents/PastEvents";

function EventsPage() {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch({type: 'FETCH_EVENTS'})
  },[])

  return (
    <>
      {user.access_level === 1 && <AddEvent />}
      <UpcomingEvents />
      <PastEvents />
    </>
  );
}

export default EventsPage;
