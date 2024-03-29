const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USER_TOKEN_KEY = process.env.USER_TOKEN_KEY;
const userModel = require("../../model/userModel");


const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation for user mail and password
    if (!(email && password)) {
      res.status(400).send({ Message: "All input are required" });
    }
    // Validate if user exist in our database
    const user = await userModel.findOne({ email });

    if (user == null) {
      return res.status(404).send({ Message: "User not found" });
    }
    const comparePasswords = await bcrypt.compare(password, user.password);

    if (user && comparePasswords) {
      // Create token
      let token;
      token = jwt.sign(
        {
          user_id: user._id,
          email,
          first_name: user.first_name,
          last_name: user.last_name,
          user_image: user.user_image,
        },
        USER_TOKEN_KEY
      );
      user.token = token;
      return res.status(200).send({
        user,
        Message: "success",
        token: user.token,
      });
    } else {
      return res.status(400).send({ Message: "Wrong email or password" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ Message: "Internal Server Error. Please contact with managers" });
  }
};
module.exports = {
  loginAuth,
};
