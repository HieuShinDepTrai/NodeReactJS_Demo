const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuration for MSSQL connection
const config = {
  user: 'sa',
  password: '1',
  server: 'localhost',
  database: 'ProjectDemo',
  options: {
    encrypt: false,
  },
};

// Connect to the database
sql.connect(config, (err) => {
  if (err) {
    console.log('Database connection failed!');
    console.log(err);
  } else {
    console.log('Database connected successfully!');
  }
});

// API endpoints

// Fetch all items
app.get('/api/items', (req, res) => {
  const query = 'SELECT * FROM items';
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch items' });
    } else {
      res.json(result.recordset);
    }
  });
});

// Create a new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const query = `INSERT INTO items (name, description) VALUES ('${name}', '${description}')`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to create item' });
    } else {
      res.json({ message: 'Item created successfully' });
    }
  });
});

// Update an item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = `UPDATE items SET name = '${name}', description = '${description}' WHERE id = ${id}`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to update item' });
    } else {
      res.json({ message: 'Item updated successfully' });
    }
  });
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM items WHERE id = ${id}`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to delete item' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
