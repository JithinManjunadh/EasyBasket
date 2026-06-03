const mongoose = require('mongoose');
const Product = require('../models/product');  // adjust path if needed
const sampleProducts = require('./data');

const MONGO_URL = "mongodb://127.0.0.1:27017/primeshelf";

main().then(()=>{
    console.log("Connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);

}

const initDB = async () =>{
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("data was initialized");
    // console.log(initData.data);
}

initDB();
