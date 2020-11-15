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
  // useEffect(() => {
  //   axios.get('/api/users/session')
  //     .then(function (response) {
  //       // handle success
  //       console.log('hello response');
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log('here we are');
  //       console.log(error)
  //     });
  // });

  return (
    <div className="App">
      <header className="App-header">
        <Nav />

      </header>
    </div>
  );
}

export default App;
