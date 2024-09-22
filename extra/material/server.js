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
    console.log(data);
    const menuItem = new MenuItem(data);
    const response = await menuItem.save();
    console.log('Data saved');
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // Fetch all menu items from the database
    res.status(200).json(menuItems); // Send the retrieved items as a response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API to retrieve menu items by taste
app.get('/menu/:taste', async (req, res) => {
  try {
    const taste = req.params.taste;
    const validTastes = ['Sweet', 'Spicy', 'Sour'];
    if (!validTastes.includes(taste)) {
      return res.status(400).json({ error: 'Invalid taste parameter' });
      
    }else{
      const menuItems = await MenuItem.find({ taste: taste });
      res.status(200).json(menuItems);
    }
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});