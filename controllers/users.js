const User = require('../models/user');

module.exports.renderSignup = (req,res)=> res.render('users/signup');

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if password is provided
        if (!password) {
            req.flash('error', 'Password is required');
            return res.redirect('/signup');
        }

        const user = new User({ username, email, role });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Lumeo!');
            res.redirect('/products');
        });
    } catch (e) {
        let msg = 'Something went wrong.';

        // Mongoose validation errors
        if (e.name === 'ValidationError') {
            msg = Object.values(e.errors).map(err => err.message).join(', ');
        }

        // Duplicate email
        if (e.code === 11000) {
            msg = 'Email already exists. Please login or use another email.';
        }

        req.flash('error', msg);
        res.redirect('/signup');
    }
};


module.exports.renderLogin=(req,res)=> res.render('users/login');

module.exports.login=(req,res)=>{
    req.flash('success','Welcome back!');
    res.redirect('/products');
};

module.exports.logout=(req,res,next)=>{
    req.logout(err=>{
        if(err) return next(err);
        req.flash('success','Logged out successfully!');
        res.redirect('/products');
    });
};
