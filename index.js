const express = require('express');
const app = express();
const db = require('./db');

// Check if db connection is successful
if (!db) {
  console.error('Failed to connect to database');
  process.exit(1);
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const menuRouter = require("./routes/menu");
app.use('/menu', menuRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});