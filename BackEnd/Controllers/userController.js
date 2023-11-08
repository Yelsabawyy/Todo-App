const {
  getAllTodos,
  AddTodo,
  DeleteTodo,
  ToggleTodo,
} = require("../utils/user");

// get all
exports.getAllTodos = async (req, res, next) => {
  try {
    const allTodos = await getAllTodos(req.body.userId);
    return res.status(200).json({ message: "Todos", allTodos: allTodos });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// add
exports.addTodo = async (req, res, next) => {
  try {
    const added = await AddTodo(req.body.todo);
    if (added) {
      return res.status(200).json({ newTodo: added });
    }
    return res.status(299).send("Please Try Again!!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// delete
exports.deleteTodos = async (req, res, next) => {
  try {
    const deleted = await DeleteTodo(req.body.todoId);
    if (deleted) {
      return res.status(200).send("Deleted Todo");
    }
    return res.status(299).send("Please Try Again!!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// edit checkbox
exports.toggleTodo = async (req, res, next) => {
  try {
    const toggled = await ToggleTodo(req.body.todoId);
    console.log(toggled);
    if (toggled) {
      return res.status(200).send("Toggle Todo");
    }
    return res.status(299).send("Please Try Again!!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
