import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ProductItem from "./items/ProductItem";
import CategoriItem from "./items/CategoriItem";

const ProductScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [sortAscending, setSortAscending] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]); // Danh sách yêu thích

  const handleFavoriteToggle = (product) => {
    setFavoriteItems((prevItems) => {
      const isFavorite = prevItems.find((item) => item.id === product.id);
      if (isFavorite) {
        return prevItems.filter((item) => item.id !== product.id); // Xóa sản phẩm khỏi yêu thích
      } else {
        return [...prevItems, product]; // Thêm sản phẩm vào yêu thích
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>

        {/* Tìm kiếm sản phẩm */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Nút sắp xếp giá */}
      <TouchableOpacity
        style={[styles.sortButton, sortAscending ? styles.activeSortButton : null]}
        onPress={() => setSortAscending(!sortAscending)}
      >
        <Text style={styles.sortButtonText}>
          Sort by Price {sortAscending ? "Descending" : "Ascending"}
        </Text>
      </TouchableOpacity>

      {/* CategoriItem với callback onSelectCategory */}
      <CategoriItem onSelectCategory={setSelectedCategoryId} />

      {/* Product List với ScrollView */}
      <ScrollView contentContainerStyle={styles.productList}>
        <ProductItem
          navigation={navigation}
          limit={10}
          selectedCategoryId={selectedCategoryId}
          searchQuery={searchText}
          sortAscending={sortAscending}
          onFavoriteToggle={handleFavoriteToggle} // Truyền hàm onFavoriteToggle vào ProductItem
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  sortButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  activeSortButton: {
    backgroundColor: "#FF3B3B",
  },
  sortButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default ProductScreen;
