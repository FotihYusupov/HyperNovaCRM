const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
require("./backup.js");
require("./connection.js");
const routes = require("./routes/router.js");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
  return res.json({ message: "Server is run!" });
});

app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: "Something went wrong!",
    details: err.message,
  });
});

function startServerOnPort(port) {
  const listen = app.listen(port, () => console.log(`server is running ${port}`))
  listen.on('error', () => {
    console.log(`Port ${port} is busy. Trying a different port...`)
    startServerOnPort(port + 1)
  })
}

startServerOnPort(PORT);
