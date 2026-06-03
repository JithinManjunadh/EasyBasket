const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');
const { isLoggedIn } = require('../middleware/middleware.js');

router.get('/', isLoggedIn, orderController.showOrderHistory);

module.exports = router;
