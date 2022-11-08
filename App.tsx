import { StatusBar } from "expo-status-bar";
import { Button, Text, TextInput, View } from "react-native";
// import "./styles.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Create from "./screens/CreateScreen";
import RootNavigator from "./navigator/RootNavigator";

export type RootStackParamList = {
  Main: undefined;
  Create: {
    title: string;
    content: string;
  };
};

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
