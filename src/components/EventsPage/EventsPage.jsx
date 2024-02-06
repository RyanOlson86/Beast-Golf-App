import React from "react";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import AddEvent from "../AddEvent/AddEvent";
import { useSelector } from "react-redux";

function EventsPage() {
  const user = useSelector(store => store.user)

  return (
    <>
      {user.access_level === 1 && <AddEvent />}
      <UpcomingEvents />
    </>
  );
}

export default EventsPage;
