import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";

import Home from "./src/screens/Home";
import TodoList from "./src/screens/TodoList";
import Login from "./src/screens/auth/Login";
import Register from "./src/screens/auth/Register";
import { MyContextProvider } from "./src/Context/MyContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <MyContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Todo List" component={TodoList} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContextProvider>
    </ToastProvider>
  );
}
