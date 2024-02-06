import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Function to GET events from server, then send to events reducer
function* fetchEvents() {
  try {
    const response = yield axios.get('/api/events');
    yield put({ type: 'SET_EVENTS', payload: response.data });
  } catch (error) {
    console.log('Events get request failed', error);
  }
}

function* eventsSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
}

export default eventsSaga;