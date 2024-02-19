import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import EventsPage from '../EventsPage/EventsPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';
import Leaderboard from '../Leaderboard/Leaderboard';
import HomePage from '../HomePage/HomePage';
import ModifyEvents from '../ModifyEvents/ModifyEvents';
import AdminPage from '../AdminPage/AdminPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: "FETCH_ALL_PLAYERS" });
    dispatch({type: 'FETCH_EVENTS'});
  }, [dispatch]);

  return (
      <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <ProtectedRoute
            // logged in shows EventsPage else shows LoginPage
            exact
            path="/events"
          >
            <EventsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Leaderboard else shows LoginPage
            exact
            path="/leaderboard"
          >
            <Leaderboard />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ModifyEvents else shows LoginPage
            exact
            path="/events/:id"
          >
            <ModifyEvents />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Leaderboard else shows LoginPage
            exact
            path="/admin"
          >
            {user.access_level === 1 ? <AdminPage /> : <Redirect to='/home'/>}
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <HomePage />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
