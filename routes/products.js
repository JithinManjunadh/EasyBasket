const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const {isLoggedIn,validateProduct, isOwnerUser} = require('../middleware/middleware.js');
const wrapAsync = require('../utils/wrapAsync');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js'); // configure cloudinary
const upload = multer({storage});

router.route('/')
    .get(productsController.index)
    .post(isLoggedIn,validateProduct,productsController.createProduct);

router.get('/new',isLoggedIn,isOwnerUser,productsController.renderNewForm); // Show new product form (can remove if only owners can add)

router.route('/:id')
    .get(wrapAsync(productsController.showProduct)); // Show single product

module.exports=router;
