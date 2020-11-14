/* Server.js */

const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');
const express = require('express');

const server = express();
server.use(express.static('dist'));

const uri = `mongodb+srv://Evan:1996>@cluster0.lvbzy.mongodb.net/big-bank?retryWrites=true&w=majority`; // Atlas
// const dbRoute = 'mongodb://localhost:27017/localhost-database'; // localhost
const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName = 'big-bank';
let db;

client.connect(err => {
  db = client.db(dbName)
  // perform actions on the collection object
  // server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
  client.close();
  console.log('success!');
});
