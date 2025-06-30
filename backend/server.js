const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create todos table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Todos table created or already exists.');
      }
    });
  }
});

// API Routes

app.get('/', (req, res) => {
  res.json({
    "ok":true
  })
})

// Get all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({"error": "Text is required"});
    return;
  }
  db.run(`INSERT INTO todos (text) VALUES (?)`, [text], function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, text, completed: 0 }
    });
  });
});

// Update a todo (toggle completed status)
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run(
    `UPDATE todos SET completed = ? WHERE id = ?`,
    [completed ? 1 : 0, id],
    function(err) {
      if (err) {
        res.status(400).json({"error": err.message});
        return;
      }
      res.json({
        "message": "success",
        "changes": this.changes
      });
    }
  );
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    `DELETE FROM todos WHERE id = ?`,
    id,
    function(err) {
      if (err) {
        res.status(400).json({"error": err.message});
        return;
      }
      res.json({
        "message": "deleted",
        "changes": this.changes
      });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
