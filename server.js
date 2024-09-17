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

const MenuItem = require('./modules/Menu');

// Validate MenuItem module
if (!MenuItem) {
  console.error('Failed to load MenuItem module');
  process.exit(1);
}

app.get('/', (req, res) => {
  res.status(200).send('Welcome To Localhost');
});

app.post('/menu', async (req, res) => {
  try {
    const data = req.body;
    const menuItem = new MenuItem(data);
    const response = await menuItem.save();
    console.log('Data saved');
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});