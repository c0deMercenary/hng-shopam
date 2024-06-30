import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const SuccessPage = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
        >
          <AntDesign name="checkcircle" size={100} color="green" />
          <View style={{ justifyContent: "center", gap: 10 }}>
            <Text
              style={{ textAlign: "center", fontWeight: "700", fontSize: 18 }}
            >
              Order Confirmed
            </Text>
            <Text style={{ textAlign: "center", fontSize: 13 }}>
              Thank you for your order
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "700", fontSize: 14 }}
            >
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "blue",
    padding: 20,
    borderRadius: 50,
    margin: 20,
    width: 250,
  },
});
