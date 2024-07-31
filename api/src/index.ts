import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const dbName = './poc.db';

app.use(express.json());

// Open SQLite database
const openDb = async () => {
  return open({
    filename: dbName,
    driver: sqlite3.Database
  });
};

// Initialize database
(async () => {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value INTEGER NOT NULL
  )`);
})();

// Create an endpoint to store data
app.post('/items', async (req, res) => {
  const { name, value } = req.body;
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO items (name, value) VALUES (?, ?)',
    [name, value]
  );
  res.status(201).json({ id: result.lastID, name, value });
});

// Create an endpoint to fetch data
app.get('/items', async (req, res) => {
  const db = await openDb();
  const items = await db.all('SELECT * FROM items');
  res.status(200).json(items);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
