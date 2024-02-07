import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Function to GET events from server, then send to events reducer
function* fetchDetails(action) {
  try {
    const response = yield axios.get(`/api/teams/${action.payload}`);
    yield put({ type: 'SET_EVENT_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('Events get request failed', error);
  }
}


function* eventsSaga() {
  yield takeLatest('FETCH_EVENT_DETAILS', fetchDetails);
}

export default eventsSaga;