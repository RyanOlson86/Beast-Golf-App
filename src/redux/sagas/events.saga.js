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

function* addEvent(action) {
    try {
        yield axios.post('/api/events', action.payload);
        yield put({type: 'FETCH_EVENTS'})    
    } catch (error) {
        console.log('Events POST request failed', error);
    }
}

function* eventsSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
  yield takeLatest('ADD_EVENT', addEvent);
}

export default eventsSaga;