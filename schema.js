const Joi = require('joi');

// User registration validation
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Username cannot be empty",
        "string.min": "Username must be at least 3 characters long",
        "any.required": "Username is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required"
    }),
    role: Joi.string().valid('owner', 'customer').default('customer')
});

// Product validation
const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    price: Joi.number().positive().required(),
    image: Joi.object({
        url: Joi.string().uri().required(),
        filename: Joi.string().required()
    }).required(),
    category: Joi.string().required()
});

// Checkout validation
const checkoutSchema = Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().pattern(/^\d+$/).required().messages({
        "string.pattern.base": "Phone must contain only numbers"
    }),
    street: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.string().pattern(/^\d+$/).required().messages({
        "string.pattern.base": "Pincode must contain only numbers"
    })
});

module.exports = {
    userSchema,
    productSchema,
    checkoutSchema
};
