const express = require("express");
const {
  createProject,
  getProjects,
  getSingleProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);
router.put("/:id", updateProject);
router.get("/", getProjects);
router.get("/:id", getSingleProject);
router.delete("/:id", deleteProject);

module.exports = router;
