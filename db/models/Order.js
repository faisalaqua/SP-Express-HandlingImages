const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, min: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrderSchema);
