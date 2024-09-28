const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority,
} = require("../controllers/controllers");

// GET /tasks
router.get("/", getAllTasks);

// GET /tasks/:id
router.get("/:id", getTaskById);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

// GET /tasks/priority/:level
router.get("/priority/:level", getTasksByPriority);

module.exports = router;
