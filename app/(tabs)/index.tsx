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
import { useContext } from "react";
import { AppContext } from "@/context/product";

export default function HomeScreen() {
  const { dispatch } = useContext(AppContext);

  const addProductToCart = (id: number) => {
    const product = data.find((item) => item.id === id);
    dispatch({ type: "ADD_PRODUCT", payload: product });
    router.push(`(tabs)/checkout`);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => addProductToCart(item.id)}
          >
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id.toString()}
        contentContainerStyle={{ gap: 15, padding: 25 }}
        columnWrapperStyle={{ gap: 15 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    gap: 4,
    width: "50%",
  },
  image: {
    height: 120,
    // width: "50%",
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
