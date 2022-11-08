import {
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../App";
import { Card, Icon } from "@rneui/themed";
import sanityClient from "../sanity";

export type customerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Main">,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const fetchTodoList = async () => {
    setRefreshing(true);
    try {
      const todoData = await sanityClient.fetch(
        `
              *[_type=='todolist'] | order(_createdAt desc) {
                ...,
            
              }
            `
      );
      setTodolist(todoData);
      setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const deleteTodo = async (id: string) => {
    setRefreshing(true);
    await sanityClient.delete(id).then(() => {
      console.log(`Deleted ${id}`);
      alert(`Deleted ${id}`);
    });
    setRefreshing(false);
    fetchTodoList();
  };

  return (
    <SafeAreaView className="bg-[#323232] flex-1  items-center h-screen">
      <Text className="text-2xl text-white font-extrabold">Todo List</Text>
      <View className="w-full">
        {refreshing ? <ActivityIndicator color="red" /> : null}

        <FlatList
          extraData={todolist}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchTodoList()}
            />
          }
          data={todolist}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => (
            <Card key={item._id}>
              <View className=" flex-row justify-between items-center">
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.content}</Text>
                </View>
                <View>
                  <Icon
                    name="cross"
                    type="entypo"
                    size={40}
                    color="red"
                    onPress={() => deleteTodo(item._id)}
                  />
                </View>
              </View>
            </Card>
          )}
        />

        {/* {todolist.map((todo) => (
            <Card key={todo._id}>
              <View className=" flex-row justify-between items-center">
                <View>
                  <Text>{todo.title}</Text>
                  <Text>{todo.content}</Text>
                </View>
                <View>
                  <Icon
                    name="cross"
                    type="entypo"
                    size={40}
                    color="red"
                    onPress={() => deleteTodo(todo._id)}
                  />
                </View>
              </View>
            </Card>
          ))} */}

        <StatusBar />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
