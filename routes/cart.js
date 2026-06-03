const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { isLoggedIn, validateCheckout } = require("../middleware/middleware.js");

router.get('/', cartController.getCart);
router.post('/add/:id', cartController.addToCart);
router.delete('/remove/:id', cartController.removeFromCart);
router.patch('/update/:id', cartController.updateCartItem);

router.route("/checkout")
    .get(isLoggedIn, cartController.getCheckoutPage)
    .post(isLoggedIn, validateCheckout, cartController.placeOrder);

router.get('/checkout/thankyou', isLoggedIn, cartController.showThankYou);

module.exports = router;