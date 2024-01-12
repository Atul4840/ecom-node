const { validateProduct,isLoggedIn } = require("../middleware");
const Product = require("../models/Product");
const Review = require("../models/Review");
const router = require("express").Router();

router.get("/products",  async (req, res) => {
  try {
    let products = await Product.find({});
    res.render("index", { products,  success: req.flash('success')});
  } catch (e) {
    res.render('error', { err: e.message });
  }
});

router.get("/products/new", isLoggedIn ,async (req, res) => {
  res.render("new");
});

router.post("/products", isLoggedIn ,validateProduct, async (req, res) => {
  try {
    let { name, img, price, desc } = req.body;
    await Product.create({ name, img, price, desc });
    res.redirect("/products");
  } catch (e) {
    res.render('error', { err: e.message });
  }
});

// Show a particular product
router.get("/products/:id",async (req, res) => {
  try {
    let { id } = req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    res.render("show", { foundProduct });
  } catch (e) {
    res.render('error', { err: e.message });
  }
});

// Edit product
router.get("/products/:id/edit",isLoggedIn , async (req, res) => {
  try {
    let { id } = req.params;
    let foundProduct = await Product.findById(id);
    res.render("edit", { foundProduct });
  } catch (e) {
    res.render('error', { err: e.message });
  }
});

router.patch("/products/:id",isLoggedIn , async (req, res) => {
  try {
    let { id } = req.params;
    let { name, img, price, desc } = req.body;
    await Product.findByIdAndUpdate(id, { name, img, price, desc });
    res.redirect("/products");
  } catch (e) {
    res.render('error', { err: e.message });
  }
});

router.delete("/products/:id", isLoggedIn,async (req, res) => {
  try {
    let { id } = req.params;
    let foundProduct = await Product.findById(id);
    for (let ids of foundProduct.reviews) {
      await Review.findByIdAndDelete(ids);
    }
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
  } catch (e) {
    res.render('error', { err: e.message });
  }
});

module.exports = router;
