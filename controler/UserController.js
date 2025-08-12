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

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(777).json({
        message: "Invalid Email address",
      });
    }
    const validPassword = await bcrypt.compare(password, User.password);
    if (!validPassword) {
      return res.status(665).json({
        message: "Invalid password",
      });
    }
    res.status(200).json({
      _id: User._id,
      email: User.email,
      password: User.password,
    });
  } catch (error) {
    res.status(555).json({
      message: "server error",
    });
  }
};

const UpdateUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { id } = req.params;

  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const update = await UserModel.findById(id);
    if (!update) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      update.password = password || update.password;
      update.firstName = firstName || update.firstName;
      update.lastName = lastName || update.lastName;
      update.email = email || update.email;
    }

    /// SAVING THE UPDATED USER DETAILS
    await update.save();

    /// RETURNING THE UPDATED USER DETAILS
    res.status(200).json(update);
  } catch (error) {
    // where im handling my server error message
    res.status(500).json({
      message: "Failed to update user",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const userDelete = await UserModel.findByIdAndDelete(id);
    if (!userDelete) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /// RETURNING A SUCCESS MESSAGE
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    // where i'm handling my server error message
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

const GetAllUser = async (req, res) => {
  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const allUser = await UserModel.find().sort({ createdAt: -1 });
    /// RETURNING THE USER DETAILS
    if (!allUser) {
      return res.status(404).json({
        message: "No users found",
      });
    } else {
      res.status(200).json(allUser);
    }
  } catch (error) {
    // where im handling my server error message
    res.status(500).json({
      message: "Failed to retrieve users",
    });
  }
};

const GetSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const singleUser = await UserModel.findById(id);
    if (!singleUser) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json(singleUser);
    }
    /// RETURNING THE USER DETAILS
  } catch (error) {
    // where im handling my server error message
    res.status(500).json({
      message: "Failed to retrieve user",
    });
  }
};

// const GetallUser = async (req, res) => {
// try {
//     const UserGet = await UserModel.find().sort({createdAt:-1});
//     res.json(UserGet);
// } catch (error) {
//     console.log(error);
// }
// };

// const LoginUser = async (req, res) => {
//   const { emailAddress, passowrd } = req.body;
//   try {
//     //// to check if task exist in our db (UserModel) under task collection

//     const User = await UserModel.findOne({
//       emailAddress,
//     });
//     if (!User) {
//       return res.status(404).json({
//         message: "Invalid User",
//       });
//     }
//     const validPassword = await bcrypt.compare(passowrd, User.passowrd);
//     if (!validPassword) {
//       return res.status(402).json({
//         message: "Invalid password",
//       });
//     }

//     /// we are saving the everything thing is the req.body to the db
//     // const result = User;

//     /////where am returning the data if successful
//     // res.status(200).json(taskResult);
//     //  or this
//     //where am returning the data if successful
//     res.status(200).json({
//         message: "login successful",
//        User
//     });
//   } catch (error) {
//     ///where am hangling my server error message
//     res.status(404).json({
//       message: "Login Failed",
//     });
//   }
// };

module.exports = {
  SignUp,
  Login,
  UpdateUser,
  deleteUser,
  GetAllUser,
  GetSingleUser,
};
