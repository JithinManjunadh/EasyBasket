require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require("ejs-mate");
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');
const MongoStore = require('connect-mongo').default;
// Routers
const productRoutes = require('./routes/products.js');
const userRoutes = require('./routes/users.js');
const cartRoutes = require('./routes/cart.js');
const oderRoutes = require('./routes/orders.js');

// MongoDB connection
// const MONGO_URL = "mongodb://127.0.0.1:27017/primeshelf";
const MONGO_URL = process.env.ATLASDB_URL;


main().then(()=>{
    console.log("Connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", (err)=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

// Session & Flash
const sessionConfig = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 } // 1 day
};
app.use(session(sessionConfig));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Flash & currentUser middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use((req, res, next) => {
    res.locals.category = null; // default for all pages
    next();
});

// Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', oderRoutes);
app.use('/', userRoutes);

// 404 handler
app.all(/.*/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// Error handler
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error",{message});
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});