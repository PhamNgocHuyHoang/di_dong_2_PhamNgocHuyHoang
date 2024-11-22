import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image,TextInput } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Serenity Nightstand',
      price: 750,
      quantity: 1,
      image: require('@/assets/images/h1.png')
    },
    {
      id: 2,
      name: 'Bedroom Dresser',
      price: 85,
      quantity: 2,
      image: require('@/assets/images/h2.png')
    },
    {
      id: 3,
      name: 'Blue Table Lamp',
      price: 20,
      quantity: 3,
      image: require('@/assets/images/h3.png')
    },
  ]);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxAndFees = 5;
  const delivery = 0;
  const total = subtotal + taxAndFees + delivery;

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
    <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
        <TextInput style={styles.quantityInput} value="1" keyboardType="numeric" />
        <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>My Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cartList}
      />
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax And Fees</Text>
          <Text style={styles.summaryValue}>${taxAndFees.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>${delivery.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#BFAF9D',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#BFAF9D',
    borderRadius: 10,
    padding: 10,
    width: 50,
    textAlign: 'center',
  },
  cartTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartList: {
    flexGrow: 0,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#999',
  },
  itemQuantity: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  summary: {
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#999',
  },
  summaryValue: {
    fontSize: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
