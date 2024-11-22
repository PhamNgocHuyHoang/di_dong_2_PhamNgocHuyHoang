import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"; 
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler'; 
import CategoriItem from "./items/CategoriItem";
import ProductItem from './items/ProductItem';
import Catego from './items/Catego';


const categories = [
  { id: 1, name: 'Living room', image: require('@/assets/images/ghe.png') },
  { id: 2, name: 'Dining room', image: require('@/assets/images/ban.png') },
  { id: 3, name: 'Kitchen', image: require('@/assets/images/Dining.png') },
  { id: 4, name: 'Bedroom', image: require('@/assets/images/Kitchen.png') },
];

const Banner = () => (
  <View style={styles.bannerContainer}>
    <ImageBackground
      source={require('@/assets/images/Rec.png')}
      style={styles.bannerImage}
      resizeMode="cover"
    />
  </View>
);

const bestSeller = {
  id: 1,
  name: 'Kitchen Cart',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  rating: 4.5,
  image: require('@/assets/images/banner1.png'),
};

const newCollection = [
  { id: 1, name: 'Aluminum Chair', price: 120, image: require('@/assets/images/ghe1.png') },
  { id: 2, name: 'Stylish Chair', price: 120, image: require('@/assets/images/ghe2.png') },
  { id: 3, name: 'Wooden Table', price: 200, image: require('@/assets/images/ghe1.png') },
  { id: 4, name: 'Office Chair', price: 150, image: require('@/assets/images/ghe2.png') },
];

const Home2Screen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Trạng thái danh mục được chọn

  const renderCategory = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryIcon} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );

  const renderNewCollectionItem = ({ item }) => (
    <View style={styles.collectionItem}>
      <Image source={item.image} style={styles.collectionImage} />
      <Text style={styles.collectionName}>{item.name}</Text>
      <Text style={styles.collectionPrice}>${item.price.toFixed(2)}</Text>
      <View style={styles.collectionActions}>
        <TouchableOpacity>
          <Text>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>➕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
        <TextInput style={styles.input} placeholder="Tìm kiếm..." placeholderTextColor="#ccc" />
        <FontAwesome name="search" color="#020202" style={styles.smallIcon} />
      </View>

      <Banner />

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      {/* <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      /> */}

      <Catego onSelectCategory={setSelectedCategoryId}  />


      {/* Best Seller */}
      <Text style={styles.sectionTitle}>Best Seller</Text>
      <View style={styles.bestSeller}>
        <Image source={bestSeller.image} style={styles.bestSellerImage} />
        <View style={styles.bestSellerDetails}>
          <Text style={styles.bestSellerName}>{bestSeller.name}</Text>
          <Text style={styles.bestSellerDescription}>{bestSeller.description}</Text>
          <Text style={styles.bestSellerRating}>⭐ {bestSeller.rating}</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* New Collection */}
      <Text style={styles.sectionTitle}>New Collection</Text>
      {/* <FlatList
        data={newCollection}
        renderItem={renderNewCollectionItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Hiển thị 2 sản phẩm mỗi hàng
        columnWrapperStyle={styles.row} // Đặt khoảng cách cho các hàng
        style={styles.newCollection}
      /> */}
      <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
      >
        <ProductItem
        navigation={navigation}
        limit={10}
        selectedCategoryId={selectedCategoryId} // Truyền selectedCategoryId để lọc sản phẩm theo danh mục
        searchQuery={''}        />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
    marginBottom: 20,
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    color: '#050505',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FF6B6B',
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    color: '#999',
  },
  bestSeller: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F4B5A4',
    borderRadius: 10,
    padding: 10,
  },
  bestSellerImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  bestSellerDetails: {
    marginLeft: 15,
    flex: 1,
  },
  shopNowButton: {
    backgroundColor: '#f5f0f0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  newCollection: {
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  collectionItem: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  collectionImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  collectionName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  collectionPrice: {
    color: '#FF6B6B',
    marginVertical: 5,
  },
  collectionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home2Screen;
