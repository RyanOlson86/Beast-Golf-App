import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Function to GET events from server, then send to events reducer
function* fetchDetails(action) {
  try {
    const response = yield axios.get(`/api/teams/${action.payload}`);
    yield put({ type: 'SET_EVENT_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('Teams get request failed', error);
  }
}

function* addPlayerToEvent(action) {
  try {
    yield axios.post(`/api/teams`, action.payload);
    yield put({ type: 'FETCH_EVENT_DETAILS', payload: action.payload.event_id});
  } catch (error) {
    console.log('Teams post request failed', error);
  }
}

function* updateScore(action) {
  try {
    yield axios.put(`/api/teams`, action.payload);
    yield put({ type: 'FETCH_EVENT_DETAILS', payload: action.payload.event_id});
  } catch (error) {
    console.log('Teams post request failed', error);
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_EVENT_DETAILS', fetchDetails);
  yield takeLatest('ADD_PLAYER_TO_EVENT', addPlayerToEvent);
  yield takeLatest('UPDATE_SCORE', updateScore)
}

export default teamsSaga;