/* Server.js */

// MongoDB
const { ObjectId } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
//Express
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// Mongoose
const mongoose = require('mongoose');
const UserModel = require('./user');

const dbName = 'big_bank';
const uri = 'mongodb+srv://Evan:1996@cluster0.lvbzy.mongodb.net/big_bank?retryWrites=true&w=majority';
const server = express();

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
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
  // When 'secure: true', req.session not saved in api/login
  cookie: {}
}));

server.get('/api/session', (req, res) => {
  if(!req.session.userId) {
    return res.status(401).send('No user logged in!');
  }
  const {userId} = req.session;
  // Mongoose ObjectId conversion not working, using Mongodb instead
  // const id = mongoose.Types.ObjectId(userId);
  UserModel.findById(ObjectId(userId), function (error, user) {
    if(error) {
      console.log(error);
      return res.status(500).send('Find user failed!');
    }
    if(!user) {
      return res.status(404).send('User does not exist');
    }
    return res.status(200).send(user);
  });
});

server.post('/api/register', (req, res) => {
  const {username, password} = req.body;
  let newUser = new UserModel();
  newUser.username = username;
  newUser.password = password;
  UserModel.findOne(
    { username: username },
    function(error, user) {
      if(error) {
        console.log(error);
        return res.status(500).send('Register failed!');
      }
      if(user) {
        return res.status(401).send('User already exists');
      }
      newUser.save(function (err) {
        if(err) {
          console.log(err);
          return res.status(500).send(`Failed to register user: ${username}`);
        }
        return res.status(200).send(`Registered user: ${username}`);
      });
    }
  )
});

server.post('/api/login', (req, res) => {
  const {username, password} = req.body;
  UserModel.findOne(
    { username: username },
    function(error, user) {
      if(error) {
        console.log(error);
        return res.status(500).send('Login failed!');
      }
      if(!user) {
        return res.status(404).send('User does not exist');
      }
      user.comparePassword(password, function(err, isMatch){
        if(isMatch && isMatch == true) {
          req.session.userId = user._id;
          return res.status(200).send(`Logged in user: ${username} with Id: ${req.session.userId}`);
        } else {
          return res.status(401).send('Password invalid');
        }
      });
    }
  )
});

server.post('/api/logout', (req, res) => {
  req.session.destroy();
  return res.status(200).send('Successful logout!');
});

server.get('/api/getuser', (req, res) => {
  const {userId} = req.session;
  // Mongoose ObjectId conversion not working, using Mongodb instead
  // const id = mongoose.Types.ObjectId(userId);
  UserModel.findById(ObjectId(userId), function (error, user) {
    if(error) {
      console.log(error);
      return res.status(500).send('Find user failed!');
    }
    if(!user) {
      return res.status(404).send('User does not exist');
    }
    return res.status(200).send(user);
  });
});

server.post('/api/addSymbol', (req, res) => {
  const {userId} = req.session;
  const {symbol} = req.body;
  // Find user by id, then push response.data obj to array
  UserModel.update({ _id: userId }, { $push: { symbols: symbol } }, function (error, user) {
    if(error) {
      console.log(error);
      return res.status(500).send('Find user failed!');
    }
    if(!user) {
      return res.status(404).send('User does not exist');
    }
    return res.status(200).send('Add to symbols successful!');;
  });
});

server.post('/api/removeSymbol', (req, res) => {
  const {userId} = req.session;
  const {symbol} = req.body;
  console.log(userId);
  console.log(symbol);
  // Find user by id, then push response.data obj to array
  // Does work { $pull: { symbols: { '01symbol' : symbol } } },
  // Doesn't work { $pull: { symbols: { '01. symbol' : symbol } } },
  UserModel.update(
    { _id: userId },
    { $pull: { symbols: { 'symbol' : symbol } } },
    { multi: true },
    (error, user) => {
    if(error) {
      console.log(error);
      return res.status(500).send('Find user failed!');
    }
    if(!user) {
      return res.status(404).send('User does not exist');
    }
    return res.status(200).send('symbol removed successfully!');;
  });
});

mongoose.connect(
  uri,
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  error => {
    if (error) {console.log(error)};
    // Webpack dev-server and express server on the same port were disrupting one another
    server.listen(8000, () => console.log(`Listening on port 8000!`));
  }
);