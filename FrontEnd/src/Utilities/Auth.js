import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiURL = process.env.REACT_NATIVE_API_URL;
// const apiURL = "http://192.168.1.3:3000";

export function IsEmail(str) {
  const email = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return email.test(str);
}

export async function RegisterRequest(userData) {
  try {
    const response = await axios.post(apiURL + "/auth/register", {
      userData: userData,
    });
    return response;
  } catch (error) {
    console.error("Error in RegisterRequest:", error);
  }
}

export async function LoginRequest(userData) {
  try {
    const response = await axios.post(apiURL + "/auth/login", {
      userData: userData,
    });
    return response;
  } catch (error) {
    console.error("Error in LoginRequest:", error);
  }
}

export async function Logout() {
  try {
    await AsyncStorage.setItem("User-Id", "");
    await AsyncStorage.setItem("User-Token", "");
    console.log("Logout successful.");
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export async function SetLocalStorage(token) {
  try {
    await AsyncStorage.setItem("User-Token", token);
  } catch (error) {
    console.warn("Error Set Token AsyncStorage:", error);
  }
}
