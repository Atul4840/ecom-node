const { validateReview } = require("../middleware");
const Product = require("../models/Product");
const Review = require("../models/Review");
const router = require("express").Router();

router.post("/products/:id/rating", validateReview, async (req, res) => {
  let { rating, comment } = req.body;
  let { id } = req.params;
  let product = await Product.findById(id);
  let review = await Review.create({ rating, comment });
  product.reviews.push(review);
  product.save();
  res.redirect(`/products/${id}`);
});

module.exports = router;
