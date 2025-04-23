const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
const TASKS_FILE = "tasks.json";

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve home page (if you have an index.html in public/)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Read tasks from file
const readTasks = () => {
  try {
    const data = fs.readFileSync(TASKS_FILE);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write tasks to file
const writeTasks = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(readTasks());
});

// POST create a new task
app.post("/tasks", (req, res) => {
  const { title, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1,
    title,
    status: status || "pending",
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT update a task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (title) tasks[taskIndex].title = title;
  if (status) tasks[taskIndex].status = status;

  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const filteredTasks = tasks.filter((t) => t.id !== parseInt(id));

  if (tasks.length === filteredTasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  writeTasks(filteredTasks);
  res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
