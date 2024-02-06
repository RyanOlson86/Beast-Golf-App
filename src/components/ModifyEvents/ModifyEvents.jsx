import React, { useEffect } from "react";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import AddEvent from "../AddEvent/AddEvent";
import { useSelector, useDispatch } from "react-redux";

function ModifyEvents() {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  return (
    <>
      {/* {user.access_level === 1 && <AddEvent />}
      <UpcomingEvents /> */}
      <h2>Modify events</h2>
    </>
  );
}

export default ModifyEvents;