const { productSchema, reviewSchema } = require("./Schema");

const validateProduct = (req, res, next) => {
  let { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });
  if (error) {
    console.log(error.details);
    const msg = error.details.map((err) => err.message).join(",");
    return res.render("error", { err: msg });
  }
  next();
};

const validateReview = (req, res, next) => {
  let { rating, comment } = req.body;
  const { error } = reviewSchema.validate({ rating, comment });
  if (error) {
    console.log(error.details);
    const msg = error.details.map((err) => err.message).join(",");
    return res.render("error", { err: msg });
  }
  next();
};

const isLoggedIn = (req,res,next)=>{
     if(!req.isAuthenticated()){
        return res.redirect('/login');
     }
     next();
};


module.exports = { validateProduct, validateReview, isLoggedIn };
