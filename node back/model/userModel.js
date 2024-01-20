const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    minLength: 3,
    required: [true, "E-mail is required"],
    unique: [true, "E-mail must be unique"],
  },
  address: { type: String },
  user_image: {
    type: String,
    default: `http://localhost:5000/images/user-defualt.png`,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: { type: String },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
