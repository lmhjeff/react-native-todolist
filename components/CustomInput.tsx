import { View, Text, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({ control, name, placeholder, secureTextEntry }: any) => {
  return (
    <View className="w-full flex flex-col mx-auto items-center">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            className="w-4/5 my-2 pl-4 bg-white   text-blue-300 h-10 rounded-lg"
          />
        )}
      />
    </View>
  );
};

export default CustomInput;
