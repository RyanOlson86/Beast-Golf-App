import React from "react";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import AddEvent from "../AddEvent/AddEvent";

function EventsPage() {
  return (
    <>
      <AddEvent />
      <UpcomingEvents />
    </>
  );
}

export default EventsPage;
