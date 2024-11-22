import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
const relatedProducts = [
  {
    id: '1',
    name: 'Wooden Chair',
    price: '$120.00',
    image: require('@/assets/images/beddt2.png')
  },
  {
    id: '2',
    name: 'Nightstand',
    price: '$80.00',
    image: require('@/assets/images/beddt3.png')
  },
  {
    id: '3',
    name: 'Lamp',
    price: '$50.00',
    image: require('@/assets/images/beddt2.png')
  },
];

const ProductScreen = ({ route, navigation }: { route: any, navigation: any }) => {


  const { id, title, price, photo, description } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [showDrinks, setShowDrinks] = useState(false);
  const [showFries, setShowFries] = useState(false);
  const [showDrinks1, setShowDrinks1] = useState(false);
  const [note, setNote] = useState(""); // Thêm trạng thái để lưu ghi chú của người dùng



  const renderRelatedProduct = ({ item }) => (
    <View style={styles.relatedProduct}>
      <Image source={item.image} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>{item.price}</Text>
    </View>
  );


  const handleAddToCart = async () => {
    try {
      const product = { id, title, price, quantity, photo };
      const userId = 1;

      const cartResponse = await fetch(`http://10.18.7.18:8080/api/carts?userId=${userId}`);
      let cartId;

      if (cartResponse.ok) {
        const cartData = await cartResponse.json();

        if (cartData.content && cartData.content.length > 0) {
          cartId = cartData.content[0].id;
        } else {
          const newCartResponse = await fetch("http://10.18.7.18:8080/api/carts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          if (!newCartResponse.ok) {
            throw new Error("Failed to create a new cart");
          }

          const newCartData = await newCartResponse.json();
          cartId = newCartData.id;
        }

        const addToCartResponse = await fetch("http://10.18.7.18:8080/api/cartDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity,
            cart: { id: cartId },
            product: { id: product.id },
          }),
        });

        if (!addToCartResponse.ok) {
          const error = await addToCartResponse.json();
          throw new Error(`Failed to add to cart: ${error.message}`);
        }

        const result = await addToCartResponse.json();
        console.log("Product added to cart:", result);

        navigation.navigate("Home", { screen: 'Cart' });
      } else {
        throw new Error("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Back Icon */}
          <Text style={styles.backIcon}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bedroom</Text>
        <FontAwesome name="search" color="#020202" style={styles.smallIcon} />
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <Text style={styles.category}>Living Room</Text>
        <Text style={styles.category}>Decorative Light</Text>
        <Text style={styles.category}>Bed</Text>
      </View>

      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri: `http://10.18.7.18:8080/api/image/products/${photo}`,
          }}
          style={styles.productImage}
        />
      </View>

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{title}</Text>
        <Text style={styles.productDescription}>{description}        </Text>
        <Text style={styles.productPrice}>${price}</Text>

        <View style={styles.itemQuantity}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText1}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton1}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        {/* Related Products */}
        <Text style={styles.relatedProductsTitle}>Related Products</Text>
        <FlatList
          data={relatedProducts}
          renderItem={renderRelatedProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.relatedProductsList}
        />

        {/* Add to Cart */}
        <TouchableOpacity style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  quantityButton: {
    backgroundColor: "#e10505",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  quantityButton1: {
    backgroundColor: "#e10505",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  quantityButtonText1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "#000000",
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  backIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchIcon: {
    fontSize: 20,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  category: {
    fontSize: 16,
    color: '#FF7F7F',
  },
  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  productImage: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  productDetails: {
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  productDescription: {
    marginVertical: 10,
    color: '#777',
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 24,
    color: '#FF7F7F',
    fontWeight: 'bold',
  },
  relatedProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  relatedProductsList: {
    marginBottom: 20,
  },
  relatedProduct: {
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  relatedProductImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  relatedProductName: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  relatedProductPrice: {
    fontSize: 14,
    color: '#FF7F7F',
    fontWeight: 'bold',
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: '#FF7F7F',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
