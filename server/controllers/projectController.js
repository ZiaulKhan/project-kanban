const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const project = await Project.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId, isDeleted: false });
    if (!projects) {
      return res.status(404).json({ error: "No projects found" });
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.userId,
      isDeleted: false,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: "Project not found" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ msg: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
