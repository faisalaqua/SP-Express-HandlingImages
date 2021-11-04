const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  firstName: String,
  lastName: String,
});

module.exports = model("User", UserSchema);
