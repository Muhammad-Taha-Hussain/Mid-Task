import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
} from "react-native";

import ProductListScreen from "@/components/ProductListScreen";
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ProductListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
    marginTop: 30,
  },
});
