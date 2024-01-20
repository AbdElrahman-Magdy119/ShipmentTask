const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");

// Register
const registerAuth = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    address,
  } = req.body;

  // Validate user input
  if (!(email && password && first_name && last_name)) {
    return res.status(400).send({ Message: "Some inputs are missing" });
  }

  // Validate if user exist in our database
  const oldUser = await userModel.findOne({ email });
  if (oldUser) {
    return res
      .status(409)
      .json({ Message: "User Already Exist. Please Login" });
  }
  const encryptedPassword = await bcrypt.hash(password, 15);

  let user_image;
  if (req.file) {
    user_image = `${process.env.IMG_URL}/images/${req.file.filename}`;
  }

  const newUser = {
    first_name: first_name,
    last_name: last_name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    address: address,
    user_image: user_image,
  };

  const user = await userModel.create(newUser);
  // Create token
  // const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
  // save user token
  // user.token = token;
  return user, res.status(201).send({ Message: "User successfully added" });
};

const getAllUser = async (req, res) => {
  try {
      const user = await userModel.find({});
      if (user.length > 0) {
          return res.status(200).send(user);
      } else {
          return res.status(404).json({ Message: "No User Found" });
      }
  } catch (err) {
      return res.status(500).send({ Message: "Try again later....." });
  }
}

module.exports = {
  registerAuth,getAllUser,
};
