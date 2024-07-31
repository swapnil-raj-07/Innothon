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
  );

  CREATE INDEX IF NOT EXISTS idx_hostname ON User(hostName);  
  
  `);

  await db.exec(`CREATE TABLE IF NOT EXISTS MasterMessages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    createdDate TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    sendFrequency INTEGER NOT NULL,
    tillDate TEXT NOT NULL ,
    active INTEGER NOT NULL
  );

   CREATE INDEX IF NOT EXISTS idx_message ON MasterMessages(message); 
  `);

  await db.exec(`CREATE TABLE IF NOT EXISTS Admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName	TEXT NOT NULL,
    lastName NULL,
    emailId	TEXT NOT NULL,
    password TEXT NOT NULL,
    active INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_emailId ON Admin(emailId); 
  `);

  await db.exec(`CREATE TABLE IF NOT EXISTS UserMessage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    messageId	INTEGER NOT NULL,
    userId 	INTEGER NOT NULL,
    createdDate TEXT NOT NULL,
    createdById INTEGER NOT NULL,
    active INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_messageId_userId ON UserMessage(messageId,userId); 
  `);

  await db.exec(`CREATE TABLE IF NOT EXISTS UserMessageHistory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userMessageId	 INTEGER NOT NULL,
    sentDate TEXT NOT NULL
  );
  
  CREATE INDEX IF NOT EXISTS idx_userMessageId ON UserMessageHistory(userMessageId);
  `);
})();

// Create an endpoint to store user data
app.post('/user', async (req, res) => {
  
  const { hostName, firstName, lastName } = req.body;
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO User (hostName, firstName, lastName) VALUES (?, ?, ?)',
    [hostName, firstName, lastName]
  );
  res.status(201).json({ id: result.lastID, hostName, firstName, lastName });
});

// Create an endpoint to store MasterMessages data
app.post('/masterMessage', async (req, res) => {
  const { message, createdDate, createdBy, sendFrequency, tillDate, active } = req.body;
  const db = await openDb();
  
  const result = await db.run(
    'INSERT INTO MasterMessages (message, createdDate, createdBy, sendFrequency, tillDate, active) VALUES (?, ?, ?, ?, ?, ?)',
    [message, createdDate, createdBy, sendFrequency, tillDate, active]
  );
  res.status(201).json({ id: result.lastID, message, createdDate, createdBy, sendFrequency, tillDate, active  });
});

// Create an endpoint to store Admin data
app.post('/admin', async (req, res) => {
  const { firstName, lastName, emailId, active, password } = req.body;
  const db = await openDb();
  
  const result = await db.run(
    'INSERT INTO Admin (firstName, lastName, emailId, active, password) VALUES (?, ?, ?, ?, ?)',
    [firstName, lastName, emailId, active, password]
  );
  res.status(201).json({ id: result.lastID, firstName, lastName, emailId, active, password });
});

// Create an endpoint to store UserMessage data
app.post('/userMessage', async (req, res) => {
  const { messageId, userId, active, createdDate, createdById } = req.body;
 
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO UserMessage (messageId, userId, active, createdDate, createdById) VALUES (?, ?, ?, ?, ?)',
    [messageId, userId, active, createdDate, createdById]
  );
  
  res.status(201).json({ id: result.lastID, messageId, userId, active, createdDate, createdById });
});



// Create an endpoint to fetch user data
app.get('/user', async (req, res) => {
  const db = await openDb();
  const items = await db.all('SELECT * FROM User');
  res.status(200).json(items);
});


// Create an endpoint to fetch MasterMessages data
app.get('/masterMessage', async (req, res) => {
  const db = await openDb();
  const items = await db.all('SELECT * FROM MasterMessages');
  res.status(200).json(items);
});

// Create an endpoint to fetch admin data
app.get('/admin', async (req, res) => {
  const db = await openDb();
  const items = await db.all('SELECT * FROM Admin');
  res.status(200).json(items);
});

// Create an endpoint to fetch UserMessage data
app.get('/userMessage', async (req, res) => {
  const db = await openDb();
  const items = await db.all('SELECT * FROM UserMessage');
  res.status(200).json(items);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
