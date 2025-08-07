const bcrypt = require("bcryptjs");
const UserModel = require("../Models/UserModel");

const SignUp = async (req, res) => {
  const { password, firstName, lastName, email, isAdmin } = req.body;

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        // maybe use 409 Conflict rather than 511
        message: "  Email exist",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      password: hashedPassword,
      firstName,
      lastName,
      email,
      isAdmin,
    });
    const result = await newUser.save();
    res.json({
      id: result._id,
      password: result.password,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      isAdmin: result.isAdmin,
    });
  } catch (error) {
    console.error("signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  SignUp,
};
