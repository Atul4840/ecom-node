const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  img: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },

  desc: {
    type: String,
    trim: true,
  },

  reviews: [
       {
           type: Schema.Types.ObjectId,
           ref: 'Review', 
       }
  ]
});

let Product = mongoose.model("Product", ProductSchema);
module.exports = Product;