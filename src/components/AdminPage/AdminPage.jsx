import React, { useState } from 'react';
import {useSelector} from 'react-redux';


/* 
TODO: Need to get players not connected to a user and all users with player_id = null
- GET All users from DB
- GET All players from DB 
- Return player_ids already connected to a user
- return user id and username for users with player_id =null
- exclude player_uds already connected to a user from selection list (use store.players and filter)

*/

function AdminPage() {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <h2>Need to create page where admin can connect user to existing player</h2>
    </div>
  );
}

export default AdminPage;