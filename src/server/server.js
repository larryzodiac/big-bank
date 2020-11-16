/* Server.js */

// MongoDB
const MongoClient = require('mongodb').MongoClient;
//Express
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// Mongoose
const mongoose = require('mongoose');
const user = require('./user');
const UserModel = require('./user');

const dbName = 'big_bank';
const uri = 'mongodb+srv://Evan:1996@cluster0.lvbzy.mongodb.net/big_bank?retryWrites=true&w=majority';
let db;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const server = express();
// client.connect(err => {
//   if (err) {console.log(err)};
//   db = client.db(dbName);
//   // Webpack dev-server and express server on the same port were disrupting one another
//   server.listen(8000, () => console.log(`Listening on port 8000!`));
//   console.log('success!');
// });

mongoose.connect(
  uri,
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  error => {
    if (error) {console.log(err)};
    // Webpack dev-server and express server on the same port were disrupting one another
    server.listen(8000, () => console.log(`Listening on port 8000!`));
    console.log('success!');
  }
);

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
server.use(bodyParser.json());
// Create session
server.use(session({
  // use UUIDs for session IDs
  // genid: uid(18, function (err, string) {
  //   if (err) throw err;
  //   return string;
  // }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// For debugging:
// app.use(function(req, res, next) {
//   console.log("SessionID: " + req.sessionID);
//   console.log(req.isAuthenticated() ? "This user is logged in" : "This user is NOT logged in");
//   next();
// });

server.get('/api/dashboard', (req, res) => {
  // res.send('hello');
  // console.log('req.session.id');
  // console.log(req.session.id);
  // console.log(req.session);
  // res.send(req.session.cookie);
  if(!req.session.user) {
    return res.status(401).send('No user logged in!');
  }
  return res.status(200).send('Already logged in!');
});

server.post('/api/register', (req, res) => {
  const {username, password} = req.body;
  let newUser = new UserModel();
  newUser.username = username;
  newUser.password = password;
  newUser.save(function (err) {
    if(err) {
      console.log(err);
      return res.status(500).send(`Failed to register user: ${username}`);
    }
    return res.status(200).send(`Registered user: ${username}`);
  });
});