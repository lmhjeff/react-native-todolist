import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import CreateScreen from "../screens/CreateScreen";
import HomeScreen from "../screens/HomeScreen";

export type TabStackParamList = {
  Main: undefined;
  Create: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#86F8C3",
        tabBarInActiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Main") {
            return (
              <Icon
                name="list"
                type="entypo"
                color={focused ? "#86F8C3" : "gray"}
              />
            );
          } else if (route.name === "Create") {
            return (
              <Icon
                name="pencil"
                type="entypo"
                color={focused ? "#86F8C3" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Main" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
