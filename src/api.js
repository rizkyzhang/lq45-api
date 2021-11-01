const express = require("express");
const router = express.Router();
const db = require("./db");

const stockList = require("./data/stockList");

router.get("/", (req, res) => {
  const url = `${req.protocol}://${req.hostname}${
    req.hostname == "localhost" ? `:${process.env.PORT || 3001}` : ""
  }`;

  res.json({
    statusCode: 200,
    message: "Welcome to LQ45 API",
    endpoints: {
      stockList: {
        description: "LQ45 stock list",
        endpoint: `${url}/api/stocklist`,
      },
      stock: {
        availablePathParams: `${url}/api/stocklist`,
        description: "Historical data of a stock",
        endpoint: `${url}/api/:stock`,
        examples: [`${url}/api/BBCA`, `${url}/api/adro`],
      },
      specificData: {
        availablePathParams: [
          "open",
          "high",
          "low",
          "close",
          "adjusted_close",
          "volume",
        ],
        description: "Specific historical data of a stock",
        endpoint: `${url}/api/:stock/:specificData`,
        examples: [`${url}/api/BBCA/open`, `${url}/api/BBNI/adjusted_close`],
      },
    },
  });
});

router.get("/stocklist", (req, res) => {
  res.json({
    status: 200,
    data: {
      stockList,
    },
  });
});

router.get("/:stock", (req, res) => {
  const stock = req.params.stock.toUpperCase();

  db.query(`SELECT * FROM ${stock}`, (error, result) => {
    res.json({
      status: 200,
      data: {
        stock,
        historicalData: result,
      },
    });
  });
});

router.get("/:stock/:specificData", (req, res) => {
  const stock = req.params.stock.toUpperCase();
  const specificData = req.params.specificData.toLowerCase();

  db.query(
    `SELECT id, date, ${specificData} FROM ${stock}`,
    (error, result) => {
      res.json({
        status: 200,
        data: {
          stock,
          historicalData: result,
        },
      });
    }
  );
});

module.exports = router;
