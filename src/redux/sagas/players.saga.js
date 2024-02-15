import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Function to GET All players from server, then send to players reducer
function* fetchPlayers() {
  try {
    const response = yield axios.get(`/api/players`);
    yield put({ type: 'SET_ALL_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('Events get request failed', error);
  }
}


function* playersSaga() {
  yield takeLatest('FETCH_ALL_PLAYERS', fetchPlayers);
}

export default playersSaga;