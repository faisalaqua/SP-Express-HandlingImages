const Shop = require("../../db/models/Shop");
const Product = require("../../db/models/Product");

exports.fetchshop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.getShop = async (req, res) => {
  try {
    const shops = await Shop.find().populate("products");
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.shopCreate = async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    req.body.shop = req.params.shopId;
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(
      { _id: req.params.shopId },
      {
        $push: { products: newProduct._id },
      }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
