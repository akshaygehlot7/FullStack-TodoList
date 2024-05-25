const express = require("express");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/userController");

const router = express.Router();

// router.route("/getusers").get(getUsers)
router.route("/tasks").get(getAllTasks);
router.route("/tasks/:id").get(getTaskById);
router.route("/tasks").post(createTask);
router.route("/tasks/:id").put(updateTask);
router.route("/tasks/:id").delete(deleteTask);

module.exports = router;
