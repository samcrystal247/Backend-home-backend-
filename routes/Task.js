const express = require("express");
const {
  CreateTask,
  GetAllTask,
  GetSingleTask,
  DeleteSingleTask,
  UpdateSingleTask,
} = require("../controler/Task2");

const router = express.Router();

router.post("/", CreateTask);

router.get("/", GetAllTask);

router.get("/:id", GetSingleTask);
router.get("/:id", DeleteSingleTask);
router.put("/:id", UpdateSingleTask);

module.exports = router;
