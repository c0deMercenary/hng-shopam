import React, { useContext, useEffect, useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { AppContext } from "@/context/product";

export default function HomeScreen() {
  const { state, dispatch } = useContext(AppContext);

  const endpoint =
    "https://api.timbu.cloud/products?organization_id=65f761b19d9d4ea9a54497784e1630f0&Appid=TWYBO6WTQAZEYNK&Apikey=32e71be8e8ad42588325edf5ded1470520240704195305778982";
  const imgUrlEndpoint = "https://api.timbu.cloud/images/";

  const products = useMemo(() => state.products, [state.products]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        dispatch({ type: "ADD_PRODUCTS", payload: data.items });
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const addProductToCart = (id: number) => {
    const product = state.products.find(
      (item: { id: number }) => item.id == id
    );
    dispatch({ type: "ADD_PRODUCT", payload: product });
    router.push(`(tabs)/checkout`);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable style={styles.productCard}>
            <Image
              source={{ uri: imgUrlEndpoint + item?.photos[0]?.url }}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.price}>
              ${item?.current_price[0]["NGN"][0]}
            </Text>
            <Text style={{ fontWeight: "500" }}>{item?.description}</Text>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => addProductToCart(item.id)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "700",
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 20,
    padding: 10,
  },
  columnWrapper: {
    padding: 5,
    gap: 5,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "flex-start",
    padding: 15,
    gap: 10,
    // width: "50%",
  },
  image: {
    width: "100%", // Ensures the image takes the full width of the container
    aspectRatio: 1,
    borderRadius: 5,
  },
  productText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#888",
    textAlign: "center",
  },
});
