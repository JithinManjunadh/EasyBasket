// Sample products
const sampleProducts = [
  // ELECTRONICS
  {
    title: "Smartphone",
    description: "Latest Android phone",
    price: 699,
    category: "Electronics",
    image: {
      url: "https://images.unsplash.com/photo-1758327059270-fdff7314104c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "electronics1"
    }
  },
  {
    title: "Laptop",
    description: "High-performance laptop for work and gaming",
    price: 1299,
    category: "Electronics",
    image: {
      url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      filename: "electronics2"
    }
  },
  {
    title: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 199,
    category: "Electronics",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "electronics3"
    }
  },
  {
    title: "Smartwatch",
    description: "Fitness tracking smartwatch",
    price: 249,
    category: "Electronics",
    image: {
      url: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "electronics4"
    }
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass",
    price: 99,
    category: "Electronics",
    image: {
      url: "https://images.unsplash.com/photo-1589833870588-8a0902bcf55b?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "electronics5"
    }
  },

  // BOOKS
  {
    title: "The Great Gatsby",
    description: "Classic novel by F. Scott Fitzgerald",
    price: 15,
    category: "Books",
    image: {
      url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      filename: "books1"
    }
  },
  {
    title: "1984",
    description: "Dystopian novel by George Orwell",
    price: 12,
    category: "Books",
    image: {
      url: "https://images.unsplash.com/photo-1622609184693-58079bb6742f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "books2"
    }
  },
  {
    title: "Thinking, Fast and Slow",
    description: "Book on cognitive biases by Daniel Kahneman",
    price: 18,
    category: "Books",
    image: {
      url: "https://images.unsplash.com/photo-1593340010859-83edd3d6d13f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "books3"
    }
  },
  {
    title: "Sapiens",
    description: "A brief history of humankind by Yuval Noah Harari",
    price: 22,
    category: "Books",
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      filename: "books4"
    }
  },
  {
    title: "Atomic Habits",
    description: "Self-help book by James Clear",
    price: 20,
    category: "Books",
    image: {
      url: "https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "books5"
    }
  },

  // CLOTHING
  {
    title: "Men's T-Shirt",
    description: "Casual cotton t-shirt",
    price: 25,
    category: "Clothing",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1755994149662-14c6a33cfcb1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "clothing1"
    }
  },
  {
    title: "Women's Jacket",
    description: "Warm and stylish jacket",
    price: 60,
    category: "Clothing",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "clothing2"
    }
  },
  {
    title: "Jeans",
    description: "Slim fit denim jeans",
    price: 45,
    category: "Clothing",
    image: {
      url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "clothing3"
    }
  },
  {
    title: "Sneakers",
    description: "Comfortable everyday sneakers",
    price: 70,
    category: "Clothing",
    image: {
      url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "clothing4"
    }
  },
  {
    title: "Hat",
    description: "Stylish summer hat",
    price: 20,
    category: "Clothing",
    image: {
      url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "clothing5"
    }
  },

  // FURNITURE
  {
    title: "Sofa",
    description: "Comfortable 3-seater sofa",
    price: 499,
    category: "Furniture",
    image: {
      url: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "furniture1"
    }
  },
  {
    title: "Dining Table",
    description: "Wooden dining table for 4 people",
    price: 299,
    category: "Furniture",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1670076510725-91a380f6de1c?q=80&w=889&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "furniture2"
    }
  },
  {
    title: "Office Chair",
    description: "Ergonomic chair for home office",
    price: 150,
    category: "Furniture",
    image: {
      url: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "furniture3"
    }
  },
  {
    title: "Bed",
    description: "Queen size bed with mattress",
    price: 399,
    category: "Furniture",
    image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "furniture4"
    }
  },
  {
    title: "Bookshelf",
    description: "Wooden bookshelf for your room",
    price: 120,
    category: "Furniture",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1733864775808-c7c1ccbe5422?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "furniture5"
    }
  },

  // TOYS
  {
    title: "Teddy Bear",
    description: "Soft and cuddly teddy bear",
    price: 25,
    category: "Toys",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1725075087153-610264ca9cbd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "toys1"
    }
  },
  {
    title: "Lego Set",
    description: "Creative building blocks",
    price: 30,
    category: "Toys",
    image: {
      url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "toys2"
    }
  },
  {
    title: "RC Car",
    description: "Remote controlled car",
    price: 15,
    category: "Toys",
    image: {
      url: "https://images.unsplash.com/photo-1629840963351-f5e2e6578f38?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "toys3"
    }
  },
  {
    title: "Puzzle",
    description: "Jigsaw puzzle for children",
    price: 20,
    category: "Toys",
    image: {
      url: "https://images.unsplash.com/photo-1590146758445-40be7019507d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "toys4"
    }
  }
];


// seed data to MongoDB atlas
// require("dotenv").config();
// const mongoose = require('mongoose');
// const Product = require('../models/product');

// const MONGO_URL = process.env.ATLASDB_URL;

// main()
// .then(() => {
// console.log("Connected to DB");
// })
// .catch((err) => {
// console.log(err);
// });

// async function main() {
// await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
// await Product.deleteMany({});
// await Product.insertMany(sampleProducts);

// console.log("Database seeded successfully!");
// };

// initDB();
module.exports = sampleProducts;
