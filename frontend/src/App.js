import React, { useState, useCallback } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';
import { SkillContext } from './components/resume/skill-context';
import { PositionContext } from './components/resume/position-context';


import PrimaryAppBar from './components/utils/PrimaryAppBar';
import Footer from './components/utils/Footer';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Landing from './components/utils/Landing';
import Res from './components/resume/Res';
import Position from './components/resume/Position';
import OpenIconSpeedDial from './components/utils/OpenIconSpeedDial';
import JobOffer from './components/post-jobs/JobOffer';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  const searched = useCallback((searchText) => {
    setSearch(searchText);
  }, []);

  const positioned = useCallback((positionText) => {
    setPosition(positionText);
  }, []);


  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
        <div style={{ marginTop: "100px" }}>
            <Landing />
            </div>
            <OpenIconSpeedDial />
        </Route>
        <Route path="/resumes" exact>
        <div style={{ marginTop: "100px" }}></div>
          <Res />
          <OpenIconSpeedDial />
        </Route>
        <Route path="/position" exact>
        <div style={{ marginTop: "100px" }}></div>
          <Position />
          <OpenIconSpeedDial />
        </Route>
        <Route path="/post_job" exact>
          <div style={{ marginTop: "0px" }}></div>
          <JobOffer />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
        <div style={{ marginTop: "20px" }}></div>
            <Landing />
        </Route>
        <Route path="/signin" exact>
            <Signin />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <SkillContext.Provider value={{ search: search, searched: searched }}>
          <PositionContext.Provider value={{ position: position, positioned: positioned }}>
          <PrimaryAppBar />
          <div style={{ marginTop: "63px" }}>
          {routes}
          </div>
          
          <Footer />
          </PositionContext.Provider>
        </SkillContext.Provider>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
