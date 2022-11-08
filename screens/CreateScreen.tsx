import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../components/CustomInput";
import sanityClient from "../sanity";

interface TodoType {
  title: string;
  content: string;
}

const Create = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, reset, register } = useForm<TodoType>();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onSubmit = async (data: TodoType) => {
    const todo = {
      _type: "todolist",
      title: data.title,
      content: data.content,
    };
    console.log("todo", todo);
    await sanityClient.create(todo).then((res) => {
      console.log(res);
    });

    reset();
  };

  return (
    <SafeAreaView className="flex justify-center bg-[#323232] flex-1  h-screen">
      <View className="flex flex-col  items-center justify-center ">
        <Text className="text-3xl text-yellow-400 font-extrabold">
          Add todo
        </Text>
        <CustomInput control={control} name="title" placeholder="title" />
        <CustomInput control={control} name="content" placeholder="content" />

        <Button title="Add" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

export default Create;
