import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';

import PrimaryAppBar from './components/utils/PrimaryAppBar';
import Footer from './components/utils/Footer';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './components/utils/Dashboard';
import Jobs from './components/utils/Jobs';
import Attend from './components/utils/Attend';
import OpenIconSpeedDial from './components/utils/speeddial';
import Chatbot from './components/utils/Chatbot';
import ImageInput from './components/api/ImageInput';
import VideoInput from './components/api/VideoInput';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
            <Dashboard />
            <Chatbot />
            <OpenIconSpeedDial />
        </Route>
        <Route path="/jobs" exact>
            <Jobs />
            <OpenIconSpeedDial />
        </Route>
        <Route path="/photo">
          <ImageInput />
        </Route>
        <Route path="/video">
          <VideoInput />
        </Route>
        <Route path="/attend" exact>
            <Attend />
            <OpenIconSpeedDial />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Signin />
        </Route>
        <Route path="/photo">
          <ImageInput />
        </Route>
        <Route path="/video">
          <VideoInput />
        </Route>
        <Route path="/signin" exact>
        <PrimaryAppBar />
            <Signin />
        </Route>
        <Route path="/signup" exact>
        <PrimaryAppBar />
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
        <div style={{ backgroundColor: "hsla(9, 100%, 80%, 0.5)" }}>
        {routes}
        </div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
