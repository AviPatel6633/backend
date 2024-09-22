const UserData = require('./../modules/user');

// POST API to create a menu item
const postUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const userData = new UserData(data);
        const response = await userData.save();
        console.log('User Data saved');
        res.status(201).json(response);
    } catch (err) {
        console.error('Error saving menu item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET API to retrieve all menu items
const getUser = async (req, res) => {
    try {
        const userData = await UserData.find(); // Fetch all menu items from the database
        res.status(200).json(userData); // Send the retrieved items as a response
    } catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    postUser,
    getUser,
};
