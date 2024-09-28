const UserData = require('./../modules/user');
const { jwtAuthMiddleware , generateToken} =require('./../jwt')
// POST API to create a menu item
const postUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const userData = new UserData(data);
        const response = await userData.save();
        console.log('User Data saved');

        // create payload
        const payload = {
            id: response.id,
            username: response.username
        }
        // crete token 
        const token = generateToken(payload)
        console.log(token, "token");

        res.status(201).json({response:response, token:token});
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

const userLogin = async (req,res) =>{
     try {

        const {username, password} = req.body;
        const user = await UserData.findOne({ username: username})
        // const checkPassword = await UserData.comparePassword(password);

        if(!user ){
            return res.status(401).json({ error: "Invalid username or password"})
        }

         // Assuming comparePassword is a method defined on your User model
         const isPasswordMatch = await user.comparePassword(password);
        
         if (!isPasswordMatch) {
             return res.status(401).json({ error: "Invalid username or password" });
         }

        //generate token
        const payload={
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        res.status(200).json({token}); // Send the retrieved items as a response
    } catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).json({ error: 'Internal Server Error' , details: err.message  });
    }
}

module.exports = {
    postUser,
    getUser,
    userLogin
};
