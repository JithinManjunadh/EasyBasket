
const Order = require('../models/order');

module.exports.showOrderHistory = async (req, res) => {
    const userId = req.user._id;

    // Populate items.product so we can access price, name, etc.
    const orders = await Order.find({ user: userId }).populate('items.product');

    res.render('orders/index', { orders });
};
