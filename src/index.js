const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const api = require("./api");
const { notFound, errorHandler } = require("./middleware");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate");
  next();
});

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.use("/api", api);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
