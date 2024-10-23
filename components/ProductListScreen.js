import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useFetchProducts } from "@/customHooks/useFetchProducts";

const ProductListScreen = () => {
  const imageAddress =
    "data:image/jpeg;base64,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";

  const { products, loading, error } = useFetchProducts();
  const [expandedSurah, setExpandedSurah] = useState(null);

  const toggleAyahs = (surahNumber) => {
    if (expandedSurah === surahNumber) {
      setExpandedSurah(null);
    } else {
      setExpandedSurah(surahNumber);
    }
  };

  const renderAyah = (ayah) => (
    <Animatable.View
      animation="fadeIn"
      key={ayah.number}
      style={styles.ayahContainer}
    >
      <Text style={styles.ayahText}>
        Verse {ayah.numberInSurah}: {ayah.text}
      </Text>
    </Animatable.View>
  );

  const renderSurah = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => toggleAyahs(item.number)}
    >
      <View style={styles.surahCard}>
        <Text style={styles.surahNumber}>Surah {item.number}</Text>
        <Text style={styles.surahName}>{item.name}</Text>
        <Text style={styles.surahEnglishName}>{item.englishName}</Text>
        <Text style={styles.surahTranslation}>
          Translation: {item.englishNameTranslation}
        </Text>
        <Text style={styles.surahAyahs}>
          Number of Ayahs: {item.ayahs.length}
        </Text>
        <Text style={styles.surahRevelation}>
          Revelation Type: {item.revelationType}
        </Text>

        {expandedSurah === item.number && (
          <View style={styles.ayahList}>{item.ayahs.map(renderAyah)}</View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching products: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={{ uri: imageAddress }}
          style={styles.image}
          resizeMethod="contain"
        />

        <FlatList
          data={products}
          keyExtractor={(item) => item.number.toString()}
          renderItem={renderSurah}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "full",
    height: 200,
    // aspectRatio: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  surahCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    width: '100%',
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  surahNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  surahName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  surahEnglishName: {
    fontSize: 20,
    color: "#444",
    marginTop: 5,
  },
  surahTranslation: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
  surahAyahs: {
    fontSize: 16,
    color: "green",
    marginTop: 4,
  },
  surahRevelation: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
  ayahList: {
    marginTop: 10,
    paddingLeft: 16,
  },
  ayahContainer: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ayahText: {
    fontSize: 16,
    color: "#444",
  },
});

export default ProductListScreen;
