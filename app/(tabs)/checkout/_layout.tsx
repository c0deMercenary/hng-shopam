import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Cart" }}
      />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
