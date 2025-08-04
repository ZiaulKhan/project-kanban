const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasksByProject,
  getTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/project/:projectId", getTasksByProject);
router.get("/", getTasks);

module.exports = router;
