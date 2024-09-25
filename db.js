require('dotenv').config()
const mongoose = require('mongoose');

// define MongoDB database connection URL
const mongoURL = process.env.DB_URL;

// setup mongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    // .then(() => console.log('Connected to MongoDB Database server'))
    // .catch(err => console.error('Failed to connect to MongoDB Database server:', err));

// Get default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Successfully connected to MongoDB Database server');
});

db.on('error', (err) => {
    console.error('MongoDB Database server error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB Database server');
});

// Export the database connection
module.exports = db;