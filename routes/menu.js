const express = require('express');
const router = express.Router();

const menuControler =  require('../controllers/menu');

// menu Routes
router.post('/', menuControler.postMenuItem);
router.get('/', menuControler.getAllMenuItems);
router.get('/:taste', menuControler.getMenuItemsByTaste);
router.put('/:id', menuControler.updateDataByid);

module.exports = router;