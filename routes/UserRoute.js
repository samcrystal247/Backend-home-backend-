const express = require("express");
const {
  SignUp,
  Login,
  UpdateUser,
  deleteUser,
  GetSingleUser,
  GetallUser,
  GetAllUser,
} = require("../controler/UserController");

const router = express.Router();

router.post("/", SignUp);

router.post("/login", Login);

router.put("/:id", UpdateUser);

router.delete("/:id", deleteUser);

router.get("/:id", GetSingleUser);

router.get("/", GetAllUser);

// router.get("/", GetAllTask);

// router.get("/:id", GetSingleTask);
// router.get("/:id", DeleteSingleTask);
// router.put("/:id", UpdateSingleTask);

module.exports = router;
