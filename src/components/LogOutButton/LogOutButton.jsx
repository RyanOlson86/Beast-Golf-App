import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory()
  return (
    <button
      className={props.className}
      onClick={() => {
        dispatch({ type: 'LOGOUT' })
        history.push('/home')
      }}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
