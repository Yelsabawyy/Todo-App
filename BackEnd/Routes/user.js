const express = require("express");
const userController = require("../Controllers/userController");
const jwtMiddleware = require("../Middleware/jwt");
const router = express.Router();

router.post("/get-all-todos", jwtMiddleware, userController.getAllTodos);
router.post("/add-todo", jwtMiddleware, userController.addTodo);
router.post("/delete-todo", jwtMiddleware, userController.deleteTodos);
router.post("/toggle-todo", jwtMiddleware, userController.toggleTodo);

module.exports = router;
