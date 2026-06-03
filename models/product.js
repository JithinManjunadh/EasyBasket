const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    category: { type: String, enum: ['Electronics', 'Books', 'Clothing', 'Furniture', 'Toys'] },
    image: { url: String, filename: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Product', ProductSchema);
