const MenuItem = require('./../modules/menu');

// POST API to create a menu item
const postMenuItem = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const menuItem = new MenuItem(data);
        const response = await menuItem.save();
        console.log('Data saved');
        res.status(201).json(response);
    } catch (err) {
        console.error('Error saving menu item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET API to retrieve all menu items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetch all menu items from the database
        res.status(200).json(menuItems); // Send the retrieved items as a response
    } catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET API to retrieve menu items by taste
const getMenuItemsByTaste = async (req, res) => {
    try {
        const taste = req.params.taste;
        const validTastes = ['Sweet', 'Spicy', 'Sour'];

        // Validate taste parameter
        if (!validTastes.includes(taste)) {
            return res.status(400).json({ error: 'Invalid taste parameter' });
        }

        // Fetch menu items by taste
        const menuItems = await MenuItem.find({ taste });
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items by taste:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// PUT API to Update menu items by _id
const updateDataByid = async (req, res) => {
    try {
        const menuId = req.params.id; // Extract the person's ID from the URL parameter
        const updatedMenuData = req.body; // Updated data for the person
        // Assuming you have a Person model
        const updatedMenu = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validation
        });
        if (!updatedMenu) {
            return res.status(404).json({
                error: 'Menu not found'
            });
        }
        // Send the updated menu data as a JSON response
        res.json(updatedMenu);
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    postMenuItem,
    getAllMenuItems,
    getMenuItemsByTaste,
    updateDataByid
};
