const Order = require("../../db/models/Order");
const Product = require("../../db/models/Product");

exports.checkout = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    req.body.items.forEach(async (item) => {
      const updatedProduct = await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity },
      });
    });

    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
