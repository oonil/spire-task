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
  //
  res.json({ msg: "hi" });
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
  //
};

module.exports = TodoController;
