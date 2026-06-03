const ExpressError = require("../utils/ExpressError"); // custom error class
const { checkoutSchema, userSchema } = require("../schema"); // import the schema

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        req.flash('error', msg);
        return res.redirect('/signup');
    } else {
        next();
    }
};


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You must be signed in!');
        return res.redirect('/login');
    }
    next();
};


module.exports.validateCheckout = (req, res, next) => {
    const { error } = checkoutSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};


module.exports.isOwnerUser = (req,res,next)=>{
    if(!req.user || req.user.role !== 'owner'){
        req.flash('error','Only shop owners can manage products.');
        return res.redirect('/products');
    }
    next();
};

// validating product creation/update
module.exports.validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

