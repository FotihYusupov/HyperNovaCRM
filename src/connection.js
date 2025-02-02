const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("db error", err.message));

const logFolder = path.join(process.cwd(), "log");

const logFileName = () => {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()}`;
  return path.join(logFolder, `${formattedDate}.mongodb.log`);
};

fs.mkdirSync(logFolder, { recursive: true });
let logStream = fs.createWriteStream(logFileName(), { flags: "a" });
mongoose.set("debug", (collectionName, method, query, doc) => {
  const logMessage = `[${new Date().toISOString()}] ${collectionName}.${method} ${JSON.stringify(
    query
  )} ${JSON.stringify(doc)}\n`;
  if (logStream.path !== logFileName()) {
    logStream.end();
    logStream = fs.createWriteStream(logFileName(), { flags: "a" });
  }

  logStream.write(logMessage);
});
