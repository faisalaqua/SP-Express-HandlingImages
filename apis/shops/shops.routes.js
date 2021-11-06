const express = require("express");
// const { productCreate } = require("../products/products.controllers");
const {
  getShop,
  shopCreate,
  productCreate,
  shopDelete,
  fetchshop,
} = require("./shops.controllers");
const router = express.Router();
const upload = require("../../middleware/multer");
const passport = require("passport");

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchshop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "Shop Not Found!" });
  }
});

// Router
router.get("/", getShop);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  productCreate
);
router.delete("/:shopId", shopDelete);

module.exports = router;
