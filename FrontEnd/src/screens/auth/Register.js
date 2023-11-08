import React, { useState, useContext } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useToast } from "react-native-toast-notifications";

import Button from "../../components/UsableButton";
import Input from "../../components/Input";

import { MyContext } from "../../Context/MyContext";
import {
  IsEmail,
  SetLocalStorage,
  RegisterRequest,
} from "../../Utilities/Auth";
import { IsEmpty } from "../../Utilities/General";

export default function Register() {
  const navigation = useNavigation();

  const { setTodoList, setUser } = useContext(MyContext);

  const [registerButton, setRegisterButton] = useState("Register");
  const [registerButtonDisable, setRegisterButtonDisable] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();

  // onPress Register Button
  async function handleRegister() {
    setRegisterButton("Loading...");
    setRegisterButtonDisable(true);
    if (
      IsEmpty(email) ||
      IsEmpty(password) ||
      IsEmpty(firstName) ||
      IsEmpty(lastName) ||
      IsEmpty(confirmPassword)
    ) {
      toast.show("Please fill in all fields!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
      setRegisterButtonDisable(false);
      setRegisterButton("Register");
      return;
    }
    if (password.length < 7) {
      toast.show("Please Enter Strong Passwrod!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
      setRegisterButtonDisable(false);
      setRegisterButton("Register");
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
      setRegisterButtonDisable(false);
      setRegisterButton("Register");
      return;
    }
    if (password !== confirmPassword) {
      toast.show("Password And Confirm Password Don't Match!", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
      setRegisterButtonDisable(false);
      setRegisterButton("Register");
      return;
    }
    const userData = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    const registerResponse = await RegisterRequest(userData);

    if (registerResponse.status == 201) {
      setUser({ userEmail: registerResponse.data.user.email });
      setTodoList([]);

      await AsyncStorage.setItem("User-Id", registerResponse.data.user.id);
      await SetLocalStorage(registerResponse.data.token);

      navigation.reset({
        index: 0,
        routes: [{ name: "Todo List" }],
      });
      setRegisterButtonDisable(false);
      setRegisterButton("Register");
      return;
    }

    toast.show(registerResponse.data, {
      type: "danger",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
    setRegisterButtonDisable(false);
    setRegisterButton("Register");
  }

  return (
    <View style={styles.Root}>
      <Text style={styles.Register}>Register</Text>
      <View style={styles.form}>
        <Text>First Name *</Text>
        <Input
          placeholder="Enter Your First Name"
          onChangeText={(text) => setFirstName(text)}
        />

        <Text>Last Name *</Text>
        <Input
          placeholder="Enter Your Last Name"
          onChangeText={(text) => setLastName(text)}
        />

        <Text>Email *</Text>
        <Input
          placeholder="Enter Your Email"
          onChangeText={(text) => setEmail(text)}
        />

        <Text>Password *</Text>
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <Text>Confirm Password *</Text>
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <Button
          buttonName={registerButton}
          buttonDisable={registerButtonDisable}
          bgColor="black"
          color="white"
          handlePress={handleRegister}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  Register: {
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
