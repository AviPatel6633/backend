require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./db');
const routerList = require("./routes/routes");
const bodyParser = require('body-parser');
const Authfunction = require('./auth')
app.use(bodyParser.json());

// Check if db connection is successful
if (!db) {
  console.log('Failed to connect to database');
  process.exit(1);
}

app.use(Authfunction.initialize());

const localAuthentication = Authfunction.authenticate('local', {session: false});

// app.use('/', localAuthentication, routerList);
app.use('/', routerList);

// Middleware Function
const LogFunction = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Url accessed: ${req.originalUrl}`);
  next(); //move to next phase 
}
app.use(LogFunction);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});