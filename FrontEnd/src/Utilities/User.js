import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiURL = process.env.REACT_NATIVE_API_URL;
// const apiURL = "http://192.168.1.3:3000";

export async function GetTodo(userId) {
  try {
    const Token = await AsyncStorage.getItem("User-Token");
    const response = await axios.post(
      apiURL + "/user/get-all-todos",
      { userId, userId },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during Fetching Data", error);
  }
}

export async function AddTodo(todo) {
  try {
    const Token = await AsyncStorage.getItem("User-Token");
    const response = await axios.post(
      apiURL + "/user/add-todo",
      { todo: todo },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during Adding", error);
  }
}
export async function DeleteTodo(todoId) {
  try {
    const Token = await AsyncStorage.getItem("User-Token");
    const response = await axios.post(
      apiURL + "/user/delete-todo",
      { todoId: todoId },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during Deleting", error);
  }
}
export async function ToggleTodo(todoId) {
  try {
    const Token = await AsyncStorage.getItem("User-Token");
    const response = await axios.post(
      apiURL + "/user/toggle-todo",
      { todoId: todoId },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during Toggling", error);
  }
}
