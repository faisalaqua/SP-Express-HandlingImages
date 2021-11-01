const express = require("express");
// const { productCreate } = require("../products/products.controllers");
const { getShop, shopCreate, productCreate } = require("./shops.controllers");
const router = express.Router();
const upload = require("../../middleware/multer");

router.get("/", getShop);
router.post("/", shopCreate);
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
