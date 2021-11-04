const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ShopSchema = new Schema(
  {
    name: String,
    image: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Shop", ShopSchema);
