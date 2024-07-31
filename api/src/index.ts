import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const dbName = './innothon.db';

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
  await db.exec(`CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hostName TEXT NOT NULL,
    firstName TEXT NULL,
    lastName TEXT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS MasterMessages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    createdDate TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    sendFrequency INTEGER NOT NULL,
    tillDate TEXT NOT NULL,
    active INTEGER NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS Admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName	TEXT NOT NULL,
    LastName TEXT NOT NULL,
    EmailId	TEXT NOT NULL,
    active INTEGER NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS UserMessage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    messageId	INTEGER NOT NULL,
    UserId 	INTEGER NOT NULL,
    active INTEGER NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS UserMessageHistory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserMessageId	 INTEGER NOT NULL,
    sentDate TEXT NOT NULL
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
