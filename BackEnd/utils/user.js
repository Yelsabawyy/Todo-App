const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllTodos(userId) {
  try {
    const todos = await prisma.todoItem.findMany({
      where: { userId: userId },
    });
    if (!todos) {
      return [];
    }
    return todos;
  } catch (error) {
    console.error("Error fetching todos", error);
    return [];
  }
}

async function AddTodo(todo) {
  try {
    const newTodo = await prisma.todoItem.create({
      data: {
        todo: todo.todo,
        check: todo.isSelected,
        userId: todo.userId,
      },
    });
    return newTodo;
  } catch (error) {
    console.error("Error adding todo", error);
    return false;
  }
}
async function EditTodo(todo) {
  try {
    const updatedTodo = await prisma.todoItem.update({
      where: { id: todo.id },
      data: {
        todo: todo.todo,
        check: todo.check,
      },
    });

    return true;
  } catch (error) {
    console.error("Error editing todo", error);
    return false;
  }
}

async function DeleteTodo(todoId) {
  try {
    const deletedTodo = await prisma.todoItem.delete({
      where: { id: todoId },
    });
    return true;
  } catch (error) {
    console.error("Error deleting todo", error);
    return false;
  }
}
async function ToggleTodo(todoId) {
  try {
    const todo = await prisma.todoItem.findUnique({
      where: { id: todoId },
    });
    if (!todo) {
      console.error("Todo not found.");
      return false;
    }
    const updatedTodo = await prisma.todoItem.update({
      where: { id: todoId },
      data: { check: !todo.check },
    });
    return true;
  } catch (error) {
    console.error("Error toggling todo status", error);
    return false;
  }
}

module.exports = { getAllTodos, AddTodo, DeleteTodo, ToggleTodo };
