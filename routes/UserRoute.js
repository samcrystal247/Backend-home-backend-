const express = require("express");
const { SignUp } = require("../controler/UserController");

const router = express.Router();

router.post("/", SignUp);

// router.get("/", GetAllTask);

// router.get("/:id", GetSingleTask);
// router.get("/:id", DeleteSingleTask);
// router.put("/:id", UpdateSingleTask);

module.exports = router;
