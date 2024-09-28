// In-memory storage for tasks
let tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
];
let nextId = 1;

// Helper function to validate task input
const validateTask = (task) => {
  if (
    !task.title ||
    typeof task.title !== "string" ||
    task.title.trim() === ""
  ) {
    return "Title is required and must be a non-empty string";
  }
  if (
    !task.description ||
    typeof task.description !== "string" ||
    task.description.trim() === ""
  ) {
    return "Description is required and must be a non-empty string";
  }
  if (task.completed !== undefined && typeof task.completed !== "boolean") {
    return "Completed status must be a boolean value";
  }
  if (task.priority && !["low", "medium", "high"].includes(task.priority)) {
    return "Priority must be low, medium, or high";
  }
  return null;
};

// GET /tasks
exports.getAllTasks = (req, res) => {
  let filteredTasks = [...tasks];

  // Filter by completion status
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === completed
    );
  }

  // Sort by creation date
  filteredTasks.sort((a, b) => a.id - b.id);

  res.json(filteredTasks);
};

// GET /tasks/:id
exports.getTaskById = (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  // Return only the required fields
  const { title, description, completed } = task;
  res.json({ title, description, completed });
};

// POST /tasks
exports.createTask = (req, res) => {
  const {
    title,
    description,
    completed = false,
    priority = "medium",
  } = req.body;
  const newTask = {
    id: nextId++,
    title: title,
    description: description,
    completed: completed,
    priority,
    createdAt: new Date(),
  };

  const validationError = validateTask(newTask);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PUT /tasks/:id
exports.updateTask = (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...req.body,
    id: tasks[taskIndex].id,
  };

  const validationError = validateTask(updatedTask);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
};

// DELETE /tasks/:id
exports.deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
};

// GET /tasks/priority/:level
exports.getTasksByPriority = (req, res) => {
  const priority = req.params.level;
  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ error: "Invalid priority level" });
  }

  const filteredTasks = tasks.filter((task) => task.priority === priority);
  res.json(filteredTasks);
};
