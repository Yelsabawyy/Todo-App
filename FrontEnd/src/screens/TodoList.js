import React, { useState, useContext } from "react";
import { MyContext } from "../Context/MyContext";

import { StyleSheet, Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import Input from "../components/Input";
import Button from "../components/UsableButton";
import TodoItem from "../components/TodoItem";
import { Logout } from "../Utilities/Auth";
import { IsEmpty } from "../Utilities/General";
import { AddTodo, DeleteTodo, ToggleTodo } from "../Utilities/User";

export default function TodoList() {
  const navigation = useNavigation();

  const [addButton, setAddButton] = useState("Add");
  const [addButtonDisable, setAddButtonDisable] = useState(false);

  const [todo, setTodo] = useState("");
  const { todoList, setTodoList } = useContext(MyContext);

  const toast = useToast();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Text
            style={styles.Logout}
            onPress={async () => {
              await Logout();
              setTodoList([]);
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            }}
          >
            Logout
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  async function Add() {
    setAddButton("Loading...");
    setAddButtonDisable(true);
    if (IsEmpty(todo)) {
      toast.show("Please Enter Todo!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
      setAddButton("Add");
      setAddButtonDisable(false);
      return;
    }
    const userId = await AsyncStorage.getItem("User-Id");
    const newItem = { todo: todo, isSelected: false, userId: userId };
    const addResponse = await AddTodo(newItem);
    if (addResponse.status === 200) {
      setTodoList([...todoList, addResponse.data.newTodo]);
      setTodo("");
      setAddButton("Add");
      setAddButtonDisable(false);
      return;
    } else {
      toast.show(addResponse.data, {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });

      setAddButton("Add");
      setAddButtonDisable(false);
    }
  }

  async function Delete(index) {
    const deleteResponse = await DeleteTodo(index);
    if (deleteResponse.status === 200) {
      const updatedTodoList = todoList.filter((item) => item.id !== index);
      setTodoList(updatedTodoList);
    } else {
      toast.show(deleteResponse.data, {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  }

  async function Toggle(index) {
    const toggleResponse = await ToggleTodo(index);
    if (toggleResponse.status !== 200) {
      toast.show(toggleResponse.data, {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.Root}>
        {/* add todo */}
        <Text style={styles.Title}>Add To Todo List</Text>
        <View style={styles.pageView}>
          <Input
            placeholder="Todo"
            value={todo}
            onChangeText={(text) => {
              setTodo(text);
            }}
          ></Input>
          <Button
            buttonName={addButton}
            addButtonDisable
            bgColor="black"
            color="white"
            handlePress={Add}
          ></Button>

          {/* render todo List*/}
          {todoList.map((item, index) => (
            <TodoItem
              onChangeCheckBox={() => {
                Toggle(item.id);
              }}
              key={item.id}
              Todo={item.todo}
              isSelected={item.check}
              onDelete={() => Delete(item.id)}
              index={item.id}
            ></TodoItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  Root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "98%",
    marginRight: "1%",
    marginLeft: "1%",
  },
  Logout: {
    marginRight: 15,
    fontSize: 19,
    fontWeight: "500",
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  pageView: {
    width: "80%",
    maxWidth: 500,
  },
});
