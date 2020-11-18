import './App.scss';
import React, { useState, useEffect, useCallback } from 'react';
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
import { Button, Content, Grid } from 'carbon-components-react';
// React Router
import { Redirect, Route, Switch } from 'react-router-dom';
// My Content Pages
import EntryPage from './content/EntryPage';
import Dashboard from './content/Dashboard';
// My Components
import Nav from './components/nav/Nav';

// 5fb00d2da408857a2396053b

function App() {
  // Declare multiple state variables!
  const [id, setId] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  // const isLoggedIn = useCallback(async () => {
  //   await axios.get('/api/dashboard')
  //   .then(function (response) {
  //     // handle success
  //     console.log(response);
  //     setId(response);
  //   })
  //   .catch(function(error) {
  //     console.log('/api/dashboard - error');
  //   });
  // }, [])

  const isLoggedIn = async () => {
    let status;
    await axios.get('/api/dashboard')
    .then(function (response) {
      // handle success
      console.log('/api/dashboard - success');
      setId(response.data);
      setLoginStatus(true);
    })
    .catch(function(error) {
      console.log('/api/dashboard - error');
      setLoginStatus(false);
    });
  }

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
          setId('');
        }
      });
  }

   // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    isLoggedIn();
    // if [], run once when App() loads and don't run again
  })

  return (
    <React.Fragment>
      <Nav loginStatus={loginStatus} logout={logout} />
      <Content>
        <Grid>
          <Switch>
            {/* <Route exact path="/" render={() => (
                id ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/entry" />
                )
              )}
            /> */}
            <Route
              exact path="/"
              render={props => (
                <EntryPage {...props}
                  loginStatus={loginStatus}
                  setLoginStatus={setLoginStatus}
                  setId={setId}
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
            {/* <Route path="/entry" component={EntryPage} /> */}
          </Switch>
        </Grid>
      </Content>
    </React.Fragment>
  );
}

export default App;
