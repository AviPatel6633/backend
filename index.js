const express = require('express');
const app = express();
const db = require('./db');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const UserData = require('./modules/user');
const routerList = require("./routes/routes");
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const Authfunction = require('./auth')
app.use(bodyParser.json());

// Check if db connection is successful
if (!db) {
  console.log('Failed to connect to database');
  process.exit(1);
}

app.use(Authfunction.initialize());

const localAuthentication = Authfunction.authenticate('local', {session: false});
// Middleware Function
const LogFunction = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Url accessed: ${req.originalUrl}`);
  next(); //move to next phase 
}
app.use(LogFunction);

// app.use('/', localAuthentication, routerList);
app.use('/', routerList);

// const port = process.env.PORT;
const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});