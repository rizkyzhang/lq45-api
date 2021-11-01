const notFound = (req, res, next) => {
  const error = new Error(`Invalid API path - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const url = `${req.protocol}://${req.hostname}${
    req.hostname == "localhost" ? `:${process.env.PORT || 3001}` : ""
  }`;

  if (res.statusCode === 404) {
    res.json({
      statusCode: 404,
      error: error.toString(),
    });
  } else if (error.code === "ER_NO_SUCH_TABLE") {
    res.status(404);
    res.json({
      statusCode: 404,
      error: "Invalid :stock path parameter",
      validPathParams: `${url}/api/stocklist`,
    });
  } else if (error.code === "ER_BAD_FIELD_ERROR") {
    res.status(404);
    res.json({
      statusCode: 404,
      error: "Invalid :specificData path parameter",
      validPathParams: [
        "open",
        "high",
        "low",
        "close",
        "adjusted_close",
        "volume",
      ],
    });
  } else {
    res.status(500);
    res.json({
      statusCode: 505,
      error: "Server error",
    });
  }
};

module.exports = {
  notFound,
  errorHandler,
};
