const express = require("express");
const { v4: uuidv4 } = require("uuid");

const TodoController = {};

//not using database using Map. to store key value
/**
 *  Key:'uniqueKey'
 *  value:{
 * 	"title":String   eg."Todo title",
 * 	"isDone":boolean e.g true/false
 *   }
 * @type {Map<{title:string,isDone:boolean}}}
 */
const taskList = new Map();

/**
 * Function to get Todo item
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
TodoController.get = async function (req, res, next) {
  // if id is provided then we will only return single task.
  const { id } = req.params;
  if (id) {
    if (!taskList.has(id)) {
      return next(new Error("Unable to get task invalid id"));
    }
    return res.status(200).json(taskList.get(id));
  }

  const totalTodos = taskList.size;
  let limit = req.query.limit || 10; //default todo limit
  let page = req.query.page || 0; // default todo page

  let maxPage = Math.ceil(totalTodos / limit) - 1;

  page = page > maxPage ? 0 : page;

  const todoKeys = Array.from(taskList.keys()); //create array key.
  const elementToReturn = todoKeys.slice(page * limit, page * limit + limit);

  const data = [];

  for (let i = 0; i < elementToReturn.length; i++) {
    const singleTask = taskList.get(elementToReturn[i]);
    data.push({
      ...singleTask,
      id: elementToReturn[i],
    });
  }

  res.status(200).json({
    data: data,
    total: totalTodos,
    limit,
    page,
  });

  // now we will limit the result with page

  //

  //   return next(new Error("hi how are you"));
};

/**
 * Function to create Todo item
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
TodoController.create = function (req, res, next) {
  //

  const { title, isDone } = req.body;

  if (!title) {
    return next(new Error("Unable to create todo item title missing"));
  }

  const id = uuidv4();
  //
  taskList.set(id, {
    title,
    isDone: isDone || false, // if status is not provided then set default false
  });
  res.status(200).json({
    id,
  });
};

/**
 * Function to update Todo item
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *  @param {express.NextFunction} next
 */
TodoController.update = function (req, res, next) {
  const { id } = req.params;
  const { isDone } = req.body;

  //check if valid status is provided.
  if (typeof isDone !== "boolean") {
    return next(new Error("Invalid todo `isDone` status provided"));
  }

  //check if given task exists
  if (!taskList.has(id)) {
    return next(new Error("Todo item not found with given id  ", id));
  }

  const updateTask = taskList.get(id);
  updateTask.isDone = isDone;

  return res.status(200).json({
    id,
  });

  // /
};

/**
 * Function to delete Todo item
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
TodoController.delete = function (req, res, next) {
  const { id } = req.params;
  if (!taskList.has(id)) {
    return next(new Error("Todo with given id not found"));
  }
  taskList.delete(id);
  return res.status(200).json({
    id,
  });

  //
};

module.exports = TodoController;
