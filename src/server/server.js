/* Server.js */

// MongoDB
const MongoClient = require('mongodb').MongoClient;
//Express
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const dbName = 'big_bank';
const uri = 'mongodb+srv://Evan:1996@cluster0.lvbzy.mongodb.net/big_bank?retryWrites=true&w=majority';
let db;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const server = express();
client.connect(err => {
  if (err) {console.log(err)};
  db = client.db(dbName);
  // Webpack dev-server and express server on the same port were disrupting one another
  server.listen(8000, () => console.log(`Listening on port 8000!`));
  console.log('success!');
});

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());
// Create session
server.use(session({
  // use UUIDs for session IDs
  // genid: function(req) {
  //   return genuuid();
  // },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

server.get('/api/users/session', (req, res) => {
  res.send('hello');
});