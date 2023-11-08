import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import Button from "../../components/UsableButton";
import Input from "../../components/Input";

import { MyContext } from "../../Context/MyContext";
import { IsEmail, SetLocalStorage, LoginRequest } from "../../Utilities/Auth";
import { IsEmpty } from "../../Utilities/General";
import { GetTodo } from "../../Utilities/User";

import { useToast } from "react-native-toast-notifications";

export default function Login() {
  const navigation = useNavigation();
  const { setUser, setTodoList } = useContext(MyContext);

  const [loginButton, setLoginButton] = useState("Login");
  const [loginButtonDisable, setLoginButtonDisable] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  // onPress Login Button
  async function handleLogin() {
    setLoginButtonDisable(true);
    setLoginButton("Loading...");
    if (IsEmpty(email) || IsEmpty(password)) {
      toast.show("Please Enter Email and Password!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });

      setLoginButtonDisable(false);
      setLoginButton("Login");
      return;
    }
    if (!IsEmail(email)) {
      toast.show("Please Check Your Email!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });

      setLoginButtonDisable(false);
      setLoginButton("Login");
      return;
    }

    const userData = {
      email: email,
      password: password,
    };
    const loginResponse = await LoginRequest(userData);
    if (loginResponse.status == 200) {
      setUser({ userEmail: loginResponse.data.user.email });

      await AsyncStorage.setItem("User-Id", loginResponse.data.user.id);
      await SetLocalStorage(loginResponse.data.token);
      const userTodoList = await GetTodo(loginResponse.data.user.id);
      setTodoList(userTodoList.data.allTodos);

      navigation.reset({
        index: 0,
        routes: [{ name: "Todo List" }],
      });
      setLoginButtonDisable(false);
      setLoginButton("Login");
      return;
    }


    toast.show(loginResponse.data, {
      type: "danger",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });

    setLoginButtonDisable(false);
    setLoginButton("Login");
  }

  return (
    <View style={styles.root}>
      <Text style={styles.login}>Login</Text>
      <View style={styles.form}>
        <Text>Email *</Text>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text>Password *</Text>
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          buttonName={loginButton}
          buttonDisable={loginButtonDisable}
          bgColor="black"
          color="white"
          handlePress={handleLogin}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  login: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    width: "80%",
    maxWidth: 500,
  },
});
