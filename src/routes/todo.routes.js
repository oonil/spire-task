const express = require("express");

const TodoController = require("../controllers/todo.controller");
const todoRouter = express.Router();

todoRouter.get("/todo/:id?", TodoController.get);
todoRouter.post("/todo", TodoController.create);

//
todoRouter.put("/todo/:id", TodoController.update);
todoRouter.delete("/todo/:id", TodoController.delete);

module.exports = { todoRouter };
