const mongoose = require('mongoose');
const userItemSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const UserData = mongoose.model('UserData', userItemSchema);
module.exports = UserData;


// Data 
// {
//     "username": "Avi",
//     "password": "Avi@6633",
//     "email": "avi@gmail.com",
// }
