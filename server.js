const express = require("express");
const dbConnection = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use(router);

dbConnection();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
