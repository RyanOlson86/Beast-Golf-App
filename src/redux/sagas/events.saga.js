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

// Function POST with new event then calls fetchEvents()
function* addEvent(action) {
    try {
        yield axios.post('/api/events', action.payload);
        yield put({type: 'FETCH_EVENTS'})    
    } catch (error) {
        console.log('Events POST request failed', error);
    }
}

// Function to Update event as complete, then call fetchEvents()
function* completeEvent(action) {
  try {
      yield axios.put(`/api/events/${action.payload}`);
      yield put({type: 'FETCH_EVENTS'})    
  } catch (error) {
      console.log('Events PUT request failed', error);
  }
}

function* eventsSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
  yield takeLatest('ADD_EVENT', addEvent);
  yield takeLatest('COMPLETE_EVENT', completeEvent);
}

export default eventsSaga;