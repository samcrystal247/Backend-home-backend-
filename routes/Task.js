const express = require("express");
const { createTask, GetAllTask, AllTask } = require("../controler/Task2");

const router = express.Router();

router.get("/", (response, request) => {
  response.json({ message: "i love my country" });
});
router.post("/", createTask);

router.put("/", GetAllTask);
router.delete("/", AllTask);

module.exports = router;
