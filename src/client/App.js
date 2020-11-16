import './App.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// My Components
import Nav from './components/nav/Nav';

// 5fb00d2da408857a2396053b

function App() {
  // Declare multiple state variables!
  const [id, setId] = useState(undefined);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    axios.get('/api/dashboard')
      .then(function (response) {
        // handle success
        console.log(response);
        console.log('hello');
      })
      .catch(function(error) {
        // console.log(error)
        console.log('ohno');
        setLoginSuccess(false);
      });
    // if [], run once when App() loads and don't run again
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      {loginSuccess
        ? <p>Logged in!</p>
        : <p>Not logged in!</p>
      }
    </div>
  );
}

export default App;
