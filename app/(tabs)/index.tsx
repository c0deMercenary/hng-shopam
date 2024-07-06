import {
  Image,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "@/data/products.json";
import { router } from "expo-router";
import { useContext, useEffect, useMemo } from "react";
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
    const product = data.find((item) => item.id === id);
    dispatch({ type: "ADD_PRODUCT", payload: product });
    router.push(`(tabs)/checkout`);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => addProductToCart(item.id)}
          >
            <Image
              source={{ uri: imgUrlEndpoint + item?.photos[0]?.url }}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.price}>
              ${item?.current_price[0]["NGN"][0]}
            </Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id.toString()}
        contentContainerStyle={{
          padding: 20,
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        columnWrapperStyle={{ gap: 8, padding: 2 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    gap: 4,
    width: "50%",
  },
  image: {
    height: 120,
  },
  productText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#888",
  },
});
