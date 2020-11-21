/*
  App.js
  Notes
  ================
*/
import './App.scss';
import React, { useState, useEffect } from 'react';
/*
  As of Babel 7.4.0, this package has been deprecated in favor of directly
  including core-js/stable (to polyfill ECMAScript features) and
  regenerator-runtime/runtime (needed to use transpiled generator functions):
*/
import 'core-js/stable';
import "regenerator-runtime/runtime.js";
// Axios
import axios from 'axios';
// Carbon
import { Content, Grid } from 'carbon-components-react';
// React Router
import { Route, Switch } from 'react-router-dom';
// My Content Pages
import EntryPage from './content/EntryPage';
import Dashboard from './content/Dashboard';
import SearchPage from './content/SearchPage';
// My Components
import Nav from './components/nav/Nav';

/*
  Context
*/

export const UserContext = React.createContext('hello');

/*
  App functions as the hub for all component traffic 🚂
*/

function App() {
  // Declare multiple state variables!
  const [user, setUser] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  /*
    Check whether a user is logged in
    Return that user to state + context
  */
  const getUser = async () => {
    await axios.get('/api/session')
    .then((response) => {
      // handle success
      setUser(response.data);
      setLoginStatus(true);
    })
    .catch((error) => {
      setLoginStatus(false);
    });
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getUser();
    // if [], run once when App() loads and don't run again
  }, [loginStatus])

  const logout = (props) => {
    /*
      react-router Route Component Props History 🔌
      Allows us to redirect by accessing the history prop!
      https://medium.com/@anneeb/redirecting-in-react-4de5e517354a
    */
    axios.post('/api/logout')
      .then((response) => {
        if (response.status === 200) {
          setLoginStatus(false);
          setUser({});
        }
      });
  }

  return (
    <UserContext.Provider value={{ user, getUser, loginStatus }}>
      <Nav loginStatus={loginStatus} logout={logout} />
      <Content>
        <Grid>
          <Switch>
            <Route
              exact path="/"
              render={props => (
                <EntryPage {...props}
                  loginStatus={loginStatus}
                  setLoginStatus={setLoginStatus}
                />
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <Dashboard {...props}
                  loginStatus={loginStatus}
                />
              )}
            />
            <Route
              path="/search/:query"
              render={props => (
                <SearchPage {...props} 
                loginStatus={loginStatus}
                />
              )}
            />
            {/* <Route path="/entry" component={EntryPage} /> */}
          </Switch>
        </Grid>
      </Content>
    </UserContext.Provider>
  );
}

export default App;
