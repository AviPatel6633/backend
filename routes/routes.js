const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware , generateToken} =require('./../jwt')

const menuControler =  require('../controllers/menu');
const userControler =  require('../controllers/user');


router.get('/', (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

// menu Routes
router.post('/menu', menuControler.postMenuItem);
router.get('/menu', menuControler.getAllMenuItems);
router.get('/menu/:taste', menuControler.getMenuItemsByTaste);
router.put('/menu/:id', menuControler.updateDataByid);
router.delete('/menu/:id', menuControler.deleteDataByid);

// user Routes
router.post('/signup', userControler.postUser);
router.get('/user', jwtAuthMiddleware, userControler.getUser);
router.post('/login', userControler.userLogin);

module.exports = router;