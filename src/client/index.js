import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
// React Router
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
