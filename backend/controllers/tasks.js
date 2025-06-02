const db = require('../db');

exports.getTasks = (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getTaskById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Task not found" });
    res.json(row);
  });
};

exports.addTask = (req, res) => {
    const { title } = req.body;
  
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Le titre est obligatoire." });
    }
  
    db.run("INSERT INTO tasks (title) VALUES (?)", [title.trim()], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title: title.trim() });
    });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  db.run("UPDATE tasks SET title = ? WHERE id = ?", [title, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ id, title });
  });
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  });
};
