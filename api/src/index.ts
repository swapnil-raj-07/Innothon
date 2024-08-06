import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

const app = express();
const dbName = "./innothon.db";

app.use(cors());
app.use(express.json());

// Open SQLite database
const openDb = async () => {
  return open({
    filename: dbName,
    driver: sqlite3.Database,
  });
};

// Initialize database
(async () => {
  const db = await openDb();

  //Create user group table
  await db.exec(`CREATE TABLE IF NOT EXISTS UserGroups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupName TEXT NOT NULL,
    createdDate,
    createdBy,
    isActive INTEGER NOT NULL DEFAULT 1
  );

  CREATE INDEX IF NOT EXISTS idx_groupname ON UserGroups(groupName);

  `);

  //Create message type table
  await db.exec(`CREATE TABLE IF NOT EXISTS MessageType (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    typeName TEXT NOT NULL,
    createdDate,
    createdBy,
    isActive INTEGER NOT NULL DEFAULT 1
  );

  CREATE INDEX IF NOT EXISTS idx_typeName ON MessageType(typeName);

  `);

  //Create message mode table
  await db.exec(`CREATE TABLE IF NOT EXISTS MessageMode (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modeName TEXT NOT NULL,
    createdDate,
    createdBy,
    isActive INTEGER NOT NULL DEFAULT 1
  );

  CREATE INDEX IF NOT EXISTS idx_typeName ON MessageMode(modeName);

  `);

  //Create user table
  await db.exec(`CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hostName TEXT NOT NULL,
    firstName,
    lastName,
    emailId,
    password,
    groupId INTEGER NULL,
    createdDate,
    createdBy,
    isActive INTEGER NOT NULL DEFAULT 1
  );

  CREATE INDEX IF NOT EXISTS idx_hostname ON User(hostName);

  `);

  //Create Notification table
  await db.exec(`CREATE TABLE IF NOT EXISTS Notification (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    header TEXT NOT NULL,
    body TEXT NOT NULL,
    type INTEGER NOT NULL,
    groupId INTEGER NULL,
    scheduledDate,
    scheduledTime,
    mode INTEGER NULL,
    points INTEGER NULL,
    imagePath,
    createdDate TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    active INTEGER NOT NULL
  );

   CREATE INDEX IF NOT EXISTS idx_header ON Notification(header);
  `);

  //Create admin table
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

  //Create User notification table
  await db.exec(`CREATE TABLE IF NOT EXISTS UserNotification (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notificationId	INTEGER NOT NULL,
    userId 	INTEGER NOT NULL,
    isRead INTEGER NOT NULL,
    futureDate TEXT NULL,
    createdDate TEXT NOT NULL,
    createdBy INTEGER NOT NULL,
    active INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_notificationId_userId ON UserNotification(notificationId,userId);
  `);

  //Create UserNotificationHistory table
  await db.exec(`CREATE TABLE IF NOT EXISTS UserNotificationHistory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userNotificationId	 INTEGER NOT NULL,
    sentDate TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_userNotificationId ON UserNotificationHistory(userNotificationId);
  `);
})();

// Create an endpoint to store userGroups data
app.post("/userGroups", async (req, res) => {
  const { groupName, createdDate, createdBy, isActive } = req.body;
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO UserGroups (groupName, createdDate, createdBy, isActive) VALUES (?, ?, ?, ?)",
    [groupName, createdDate, createdBy, isActive]
  );
  res
    .status(201)
    .json({ id: result.lastID, groupName, createdDate, createdBy, isActive });
});

// Create an endpoint to store messageType data
app.post("/messageType", async (req, res) => {
  const { typeName, createdDate, createdBy, isActive } = req.body;
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO MessageType (typeName, createdDate, createdBy, isActive) VALUES (?, ?, ?, ?)",
    [typeName, createdDate, createdBy, isActive]
  );
  res
    .status(201)
    .json({ id: result.lastID, typeName, createdDate, createdBy, isActive });
});

// Create an endpoint to store messageMode data
app.post("/messageMode", async (req, res) => {
  const { modeName, createdDate, createdBy, isActive } = req.body;
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO MessageMode (modeName, createdDate, createdBy, isActive) VALUES (?, ?, ?, ?)",
    [modeName, createdDate, createdBy, isActive]
  );
  res
    .status(201)
    .json({ id: result.lastID, modeName, createdDate, createdBy, isActive });
});

// Create an endpoint to store user data
app.post("/user", async (req, res) => {
  const {
    hostName,
    firstName,
    lastName,
    emailId,
    password,
    groupId,
    createdDate,
    createdBy,
    isActive,
  } = req.body;
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO User (hostName, firstName,  lastName,  emailId,  password,  groupId, createdDate, createdBy, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      hostName,
      firstName,
      lastName,
      emailId,
      password,
      groupId,
      createdDate,
      createdBy,
      isActive,
    ]
  );
  res.status(201).json({
    id: result.lastID,
    hostName,
    firstName,
    lastName,
    emailId,
    password,
    groupId,
    createdDate,
    createdBy,
    isActive,
  });
});

// Create an endpoint to store notification data
app.post("/notification", async (req, res) => {
  try {
    console.log("notification##", { req: req.body });

    const {
      header,
      body,
      type,
      groupId,
      scheduledDate,
      scheduledTime,
      mode,
      points,
      createdDate,
      createdBy,
      active,
    } = req.body;
    const imagePath = `/images/${type}.png`;

    // if (!header || !body || !type || !groupId || !scheduledDate || !scheduledTime || !mode || !points || !createdDate || !createdBy || active === undefined) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }

    const db = await openDb();
    const result = await db.run(
      `INSERT INTO Notification (
        header,
        body,
        type,
        groupId,
        scheduledDate,
        scheduledTime,
        mode,
        points,
        imagePath,
        createdDate,
        createdBy,
        active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        header,
        body,
        type,
        groupId,
        scheduledDate,
        scheduledTime,
        mode,
        points,
        imagePath,
        createdDate,
        createdBy,
        active,
      ]
    );

    let selectQuery = "SELECT * FROM User";
    if (groupId) selectQuery = `SELECT * FROM User where groupId = ${groupId}`;
    console.log("groupId", selectQuery);
    const items = await db.all(selectQuery);
    for (const item of items) {
      await db.run(
        "INSERT INTO UserNotification (notificationId, userId, createdBy, active, isRead, createdDate) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
        [result.lastID, item.id, createdBy, 1, 0]
      );
    }
    // res.status(200).json(items);

    res.status(201).json({
      id: result.lastID,
      header,
      body,
      type,
      groupId,
      scheduledDate,
      scheduledTime,
      mode,
      points,
      imagePath,
      createdDate,
      createdBy,
      active,
    });
  } catch (error) {
    console.error("Error inserting notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create an endpoint to store Admin data
app.post("/admin", async (req, res) => {
  const { firstName, lastName, emailId, active, password } = req.body;
  const db = await openDb();

  const result = await db.run(
    "INSERT INTO Admin (firstName, lastName, emailId, active, password) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName, emailId, active, password]
  );
  res.status(201).json({
    id: result.lastID,
    firstName,
    lastName,
    emailId,
    active,
    password,
  });
});

// Create an endpoint to store userNotification data
app.post("/userNotification", async (req, res) => {
  const { notificationId, userId, createdDate, createdBy, active, isRead } =
    req.body;

  const db = await openDb();
  const result = await db.run(
    "INSERT INTO UserNotification (notificationId, userId, createdDate, createdBy, active, isRead) VALUES (?, ?, ?, ?, ?, ?)",
    [notificationId, userId, createdDate, createdBy, active, isRead]
  );

  res.status(201).json({
    id: result.lastID,
    notificationId,
    userId,
    createdDate,
    createdBy,
    active,
  });
});

// Create an endpoint to fetch UserGroups data
app.get("/userGroups", async (req, res) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM UserGroups");
  res.status(200).json(items);
});

// Create an endpoint to fetch MessageType data
app.get("/messageType", async (req, res) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM MessageType");
  res.status(200).json(items);
});

// Create an endpoint to fetch MessageMode data
app.get("/messageMode", async (req, res) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM MessageMode");
  res.status(200).json(items);
});

// Create an endpoint to fetch user data
app.get("/user", async (req, res) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM User");
  res.status(200).json(items);
});

// Create an endpoint to fetch Notification data
app.get("/notification", async (req, res) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM Notification");
  res.status(200).json(items);
});

// Create an endpoint to fetch admin data
app.get("/admin", async (req, res) => {
  const db = await openDb();
  const items = await db.all("SELECT * FROM Admin");
  res.status(200).json(items);
});

// Create an endpoint to fetch all UserMessage data
app.get("/userNotification", async (req, res) => {
  const { userId } = req.query;
  if (!userId) res.status(400).json({ message: "userId invalid" });
  const db = await openDb();
  const items = await db.all(
    `SELECT ug.groupName as groupName,
    mt.typeName as typeName,
    mm.modeName as modeName,
    u.hostName as hostName,
    u.firstName as firstName,
    u.lastName as lastName,
    u.emailId as emailId,
    n.header as header,
    n.body as body,
    n.type as type,
    n.groupId as groupId,
    n.scheduledDate as scheduledDate,
    n.scheduledTime as scheduledTime,
    n.mode as mode,
    n.points as points,
    n.imagePath as imagePath,
    un.notificationId as notificationId,
    un.userId  as userId,
    un.isRead as isRead,
    un.createdDate as createdDate,
    un.createdBy as createdBy,
    un.active as active,
    un.futureDate as futureDate
	FROM UserNotification un
INNER JOIN Notification n ON un.notificationId = n.id
INNER JOIN User u ON u.id = un.userId
INNER JOIN UserGroups ug ON u.groupId = ug.id
INNER JOIN MessageType mt ON mt.id = n.type
INNER JOIN MessageMode mm ON mm.id = n.mode
WHERE u.hostName = ?`,
    [userId]
  );
  res.status(200).json(items);
});

// Create an endpoint to fetch read UserMessage data
app.get("/userNotificationRead", async (req, res) => {
  const { userId } = req.query;
  if (!userId) res.status(400).json({ message: "userId invalid" });
  const db = await openDb();
  const items = await db.all(
    `SELECT ug.groupName as groupName,
    mt.typeName as typeName,
    mm.modeName as modeName,
    u.hostName as hostName,
    u.firstName as firstName,
    u.lastName as lastName,
    u.emailId as emailId,
    n.header as header,
    n.body as body,
    n.type as type,
    n.groupId as groupId,
    n.scheduledDate as scheduledDate,
    n.scheduledTime as scheduledTime,
    n.mode as mode,
    n.points as points,
    n.imagePath as imagePath,
    un.notificationId as notificationId,
    un.userId  as userId,
    un.isRead as isRead,
    un.createdDate as createdDate,
    un.createdBy as createdBy,
    un.active as active,
    un.futureDate as futureDate
	FROM UserNotification un
INNER JOIN Notification n ON un.notificationId = n.id
INNER JOIN User u ON u.id = un.userId
INNER JOIN UserGroups ug ON u.groupId = ug.id
INNER JOIN MessageType mt ON mt.id = n.type
INNER JOIN MessageMode mm ON mm.id = n.mode
WHERE u.hostName = ? AND un.isRead = 1`,
    [userId]
  );
  res.status(200).json(items);
});

// Create an endpoint to fetch unread UserMessage data
app.get("/userNotificationUnRead", async (req, res) => {
  const { userId } = req.query;
  if (!userId) res.status(400).json({ message: "userId invalid" });
  const db = await openDb();
  const items = await db.all(
    `SELECT ug.groupName as groupName,
    mt.typeName as typeName,
    mm.modeName as modeName,
    u.hostName as hostName,
    u.firstName as firstName,
    u.lastName as lastName,
    u.emailId as emailId,
    n.header as header,
    n.body as body,
    n.type as type,
    n.groupId as groupId,
    n.scheduledDate as scheduledDate,
    n.scheduledTime as scheduledTime,
    n.mode as mode,
    n.points as points,
    n.imagePath as imagePath,
    un.notificationId as notificationId,
    un.userId  as userId,
    un.isRead as isRead,
    un.createdDate as createdDate,
    un.createdBy as createdBy,
    un.active as active,
    un.futureDate as futureDate
	FROM UserNotification un
INNER JOIN Notification n ON un.notificationId = n.id
INNER JOIN User u ON u.id = un.userId
INNER JOIN UserGroups ug ON u.groupId = ug.id
INNER JOIN MessageType mt ON mt.id = n.type
INNER JOIN MessageMode mm ON mm.id = n.mode
WHERE u.hostName = ? AND un.isRead = 0`,
    [userId]
  );
  res.status(200).json(items);
});

// Create an endpoint to fetch unread UserMessage data
app.get("/userNotificationAll", async (req, res) => {
  const db = await openDb();
  const items = await db.all(`SELECT ug.groupName as groupName,
    mt.typeName as typeName,
    mm.modeName as modeName,
    u.hostName as hostName,
    u.firstName as firstName,
    u.lastName as lastName,
    u.emailId as emailId,
    n.header as header,
    n.body as body,
    n.type as type,
    n.groupId as groupId,
    n.scheduledDate as scheduledDate,
    n.scheduledTime as scheduledTime,
    n.mode as mode,
    n.points as points,
    n.imagePath as imagePath,
    un.notificationId as notificationId,
    un.userId  as userId,
    un.isRead as isRead,
    un.createdDate as createdDate,
    un.createdBy as createdBy,
    un.active as active
	FROM UserNotification un
INNER JOIN Notification n ON un.notificationId = n.id
INNER JOIN User u ON u.id = un.userId
INNER JOIN UserGroups ug ON u.groupId = ug.id
INNER JOIN MessageType mt ON mt.id = n.type
INNER JOIN MessageMode mm ON mm.id = n.mode`);
  res.status(200).json(items);
});

//Put requests
app.put("/userNotification", async (req, res) => {
  const { notificationId, userId } = req.query;
  const { isRead, futureDate } = req.body;

  if (!notificationId || !userId || !futureDate) {
    return res
      .status(400)
      .json({ error: "Both notificationId and userId are required" });
  }

  if (isRead === undefined) {
    return res.status(400).json({ error: "The isRead field is required" });
  }

  const db = await openDb();
  const result = await db.run(
    "UPDATE UserNotification SET isRead = ?, futureDate = ? WHERE notificationId = ? AND userId = ?",
    [isRead, futureDate, notificationId, userId]
  );

  if (result.changes === 0) {
    return res
      .status(404)
      .json({ error: "Notification not found for the given user" });
  }

  res.status(200).json({
    message: "Notification updated successfully",
    notificationId,
    userId,
    isRead,
  });
});

app.use(express.static("public"));
app.use("/images", express.static("images"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
