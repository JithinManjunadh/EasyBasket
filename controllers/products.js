const Product = require('../models/product');
const wrapAsync = require('../utils/wrapAsync');
const Cart = require('../models/cart');

module.exports.index = wrapAsync(async(req,res)=>{
    const category = req.query.category || 'All';
    let products;
    if(category==='All'){
        products = await Product.find({});
    } else {
        products = await Product.find({category});
    }
    // console.log(products);

    let cartQuantities = {};

  if (req.user) {
    // Fetch user's current cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items.forEach(item => {
        cartQuantities[item.product.toString()] = item.quantity;
      });
    }
  }

  res.render("products/index", { products, category, cartQuantities });
});

module.exports.renderNewForm=(req,res)=>{
    res.render('products/new',{category: null  });
};

module.exports.createProduct = async (req, res) => {
    const { title, description, price, category, imageUrl } = req.body;

    // Create a new product
    const product = new Product({
        title,
        description,
        price,
        category,
        image: {
            url: imageUrl,
            filename: imageUrl.split("/").pop() // simple filename from url
        }
    });

    await product.save();
    req.flash('success', 'Product added successfully!');
    res.redirect('/products');
};

module.exports.showProduct = wrapAsync(async (req, res) => {
    const { id } = req.params;

    // Fetch product by ID
    const product = await Product.findById(id);

    if (!product) {
        req.flash('error', 'Product not found!');
        return res.redirect('/products');
    }

    let cartQuantities = {};
    if (req.user) {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items.forEach(item => {
                cartQuantities[item.product.toString()] = item.quantity;
            });
        }
    }
    
    res.render('products/show', { product, category: null, cartQuantities });
});


module.exports.renderEditForm=wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const product = await Product.findById(id);
    if(!product){
        req.flash('error','Cannot find product');
        return res.redirect('/products');
    }
    res.render('products/edit',{product});
});

module.exports.updateProduct=wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,{...req.body.product});
    if(req.file){
        product.image={url:req.file.path, filename:req.file.filename};
    }
    await product.save();
    req.flash('success','Product updated!');
    res.redirect('/products');
});

module.exports.deleteProduct=wrapAsync(async(req,res)=>{
    const {id}=req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success','Product deleted!');
    res.redirect('/products');
});
