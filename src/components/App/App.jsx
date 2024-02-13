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
import UserPage from '../UserPage/UserPage';
import EventsPage from '../EventsPage/EventsPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';
import Leaderboard from '../Leaderboard/Leaderboard';
import HomePage from '../HomePage/HomePage';
import ModifyEvents from '../ModifyEvents/ModifyEvents';
import TestGrid from '../TestGrid/TestGrid';
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

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

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

          <ProtectedRoute
            // logged in shows TestGrid else shows LoginPage
            exact
            path="/test/:pageId"
          >
            <TestGrid />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
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
              // redirect them to the /user page
              <Redirect to="/user" />
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
