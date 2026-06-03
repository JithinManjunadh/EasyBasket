const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/order');

module.exports.getCart = async (req, res) => {
    if (!req.user) return res.redirect('/login');
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }
    res.render('cart', { cart });
};

module.exports.addToCart = async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    const userId = req.user._id;
    const productId = req.params.id;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ product: productId, quantity: 1 });
    }
    await cart.save();

    const newQty = cart.items.find(
        (item) => item.product.toString() === productId
    ).quantity;

    res.json({
        success: true,
        newQuantity: newQty,
        totalCartCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    });
};

module.exports.removeFromCart = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Login required' });
    }
    const userId = req.user._id;
    const productId = req.params.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    cart.items = cart.items.filter(item => item.product._id.toString() !== productId);
    const newCartTotal = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    await cart.save();
    res.json({
        success: true,
        newCartCount: cart.items.length,
        newCartTotal: newCartTotal,
        totalCartCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    });
};

module.exports.updateCartItem = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Login required' });
    }

    const userId   = req.user._id;
    const productId = req.params.id;
    const { action } = req.body;   // 'increment' | 'decrement'

    try {
        // findOneAndUpdate with $inc so we do it atomically
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const item = cart.items.find(i => i.product.toString() === productId);
        if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });

        if (action === 'increment') {
            item.quantity += 1;
        } else if (action === 'decrement') {
            if (item.quantity <= 1) {
                // Remove the item entirely
                cart.items = cart.items.filter(i => i.product.toString() !== productId);
            } else {
                item.quantity -= 1;
            }
        } else {
            return res.status(400).json({ success: false, message: 'Invalid action' });
        }

        await cart.save();

        // Populate to calculate totals
        await cart.populate('items.product');

        const newCartTotal   = cart.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
        const totalCartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
        const updatedItem    = cart.items.find(i => i.product._id.toString() === productId);

        return res.json({
            success:      true,
            removed:      !updatedItem,
            newQuantity:  updatedItem ? updatedItem.quantity : 0,
            itemTotal:    updatedItem ? (updatedItem.quantity * updatedItem.product.price).toFixed(2) : '0.00',
            newCartTotal: newCartTotal.toFixed(2),
            newCartCount: cart.items.length,
            totalCartCount
        });

    } catch (err) {
        console.error('updateCartItem error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports.getCheckoutPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
        req.flash("error", "Your cart is empty!");
        return res.redirect("/products");
    }
    res.render("orders/checkout", { cart });
};

module.exports.placeOrder = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
        req.flash("error", "Your cart is empty!");
        return res.redirect("/products");
    }
    const { fullName, phone, street, city, pincode } = req.body;
    const newOrder = new Order({
        user: userId,
        items: cart.items,
        address: { fullName, phone, street, city, pincode },
        paymentMethod: "COD"
    });
    await newOrder.save();
    cart.items = [];
    await cart.save();
    req.flash("success", "Order placed successfully!");
    res.redirect('/cart/checkout/thankyou');
};

module.exports.showThankYou = (req, res) => {
    res.render('orders/thankyou');
};