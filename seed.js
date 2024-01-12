const mongoose = require("mongoose");
const Product = require("./models/Product")

const products = [
  {
    name: "iphone 15pro",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Vh4bInQq4gqRw-j8JD-WKG2NSdhtEZKEwQ&usqp=CAU",
    price: 15090,
    desc: "this is good phone",
  },
  {
    name: "macbook pro",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBGnMkeKTTpE94b3AGjfBVBa_ZwUXJjApItQ&usqp=CAU",
    price: 1500000,
    desc: "this is good laptop",
  },
  {
    name: "apple pencil",
    img: "https://images.unsplash.com/photo-1594200664133-0ee987e1babf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBhZCUyMHBlbmNpbHxlbnwwfHwwfHx8MA%3D%3D",
    price: 15999,
    desc: "this is good pencil",
  },
];

async function seedDB(){
    await Product.insertMany(products);
    console.log('db seeded')
}

module.exports = seedDB;
