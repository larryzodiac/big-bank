import './App.scss';
import React, { useState, useEffect } from 'react';
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
  const [id, setId] = useState(null);

  const getSession = () => {
    axios.get('/api/dashboard')
    .then(function (response) {
      // handle success
      setId(response.data);
      console.log(id);
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getSession();
    // if [], run once when App() loads and don't run again
  });

  return (
    <React.Fragment>
      <Nav />
      <Content>
        <Grid>
          <Switch>
            <Route exact path="/" render={() => (
                id ? (
                  <Redirect to="/dashboard" />           
                ) : (
                  <Redirect to="/entry" />
                )
              )}
            />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="/entry" component={EntryPage} /> */}
            <Route path="/entry" render={props => <EntryPage {...props} setId={setId} />} />
          </Switch>
        </Grid>
      </Content>
    </React.Fragment>
  );
}

export default App;
