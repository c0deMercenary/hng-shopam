import { Tabs } from "expo-router";
import React from "react";

 import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Products",
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: "Checkout",
          tabBarIcon: () => (
            <MaterialIcons
              name="shopping-cart-checkout"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
