const express = require("express");
const { todoRouter } = require("./todo.routes");

//main router
const indexRouter = express.Router();

indexRouter.use("/", todoRouter);

module.exports = { indexRouter };
