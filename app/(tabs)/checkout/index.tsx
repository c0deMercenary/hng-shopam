import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import data from "@/data/products.json";
import { MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "@/context/product";

const Checkout = () => {
  const orders: any = [];
  const { state, dispatch } = useContext(AppContext);

  // useEffect(() => {
  //   const temp = data.find((item) => item.id === Number(checkout));
  //   orders.push(temp);
  //   // console.log(orders);
  // }, [checkout]);

  console.log(state);

  const deleteProduct = (id: number) => {
    const product = state.products.filter((item: any) => item.id !== id);
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const handleCheckout = () => {
    dispatch({ type: "DELETE_ALL_PRODUCTS" });
    router.push("checkout/success");
  };

  return (
    <SafeAreaView>
      <FlatList
        data={state.products}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Image
                source={{ uri: item.image }}
                resizeMode="cover"
                style={styles.image}
              />
              <View style={{ gap: 5 }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>
                  {item?.name}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  ${item?.price} | x{item?.quantity}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => deleteProduct(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </Pressable>
          </View>
        )}
      />
      {state?.products.length !== 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCheckout()}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 100,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    height: 80,
    width: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "blue",
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
