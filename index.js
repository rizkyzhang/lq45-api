const express = require("express");
const app = express();
const db = require("./db");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
