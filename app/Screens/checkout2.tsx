import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,TextInput } from 'react-native';

const CheckoutScreen = ({ navigation, route }) => {
  const { cartItems, totalAmount } = route.params; // Nhận cartItems và totalAmount từ navigation
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handlePayNow = async () => {
    try {
      const userId = 2; // Giả sử userId cố định là 2
      let orderId;

      // Tạo một đơn hàng mới
      const newOrderResponse = await fetch("http://10.18.7.18:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, total: totalAmount }),
      });
      console.log("New Order Response Status:", newOrderResponse.status);
      if (!newOrderResponse.ok) throw new Error("Failed to create a new order");
      
      const newOrderData = await newOrderResponse.json();
      orderId = newOrderData.id;

      // Thêm sản phẩm vào orderDetails
      for (const item of cartItems) {
        const addToOrderResponse = await fetch("http://10.18.7.18:8080/api/orderDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: item.quantity,
            order: { id: orderId },
            product: { id: item.product.id },
          }),
        });

        if (!addToOrderResponse.ok) throw new Error("Failed to add to order");
      }

      Alert.alert("Thanh toán thành công", "Đơn hàng của bạn đang được xử lý.");
      navigation.navigate("thank");
    } catch (error) {
      console.error("Error processing payment:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };



  const handleAddToOrder = async () => {
    try {
      const userId = 2; // Giả sử userId cố định là 1

      // Fetch orders by userId
      const orderResponse = await fetch(
        `http://10.18.7.18:8080/api/orders?userId=${userId}`
      );
      let orderId;

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();

        // Nếu đơn hàng đã tồn tại, lấy orderId
        if (orderData.content && orderData.content.length > 0) {
          orderId = orderData.content[0].id;
        } else {
          // Tạo một đơn hàng mới nếu không tồn tại đơn hàng
          const newOrderResponse = await fetch(
            "http://10.18.7.18:8080/api/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            }
          );

          if (!newOrderResponse.ok) {
            throw new Error("Failed to create a new order");
          }

          const newOrderData = await newOrderResponse.json();
          orderId = newOrderData.id;
        }

        // Duyệt qua từng sản phẩm trong giỏ hàng và thêm vào orderDetails
        for (const item of cartItems) {
          const addToOrderResponse = await fetch(
            "http://10.18.7.18:8080/api/orderDetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                quantity: item.quantity,
                order: { id: orderId }, // Sử dụng orderId đã lấy được
                product: { id: item.product.id }, // Lấy product_id từ sản phẩm trong giỏ hàng
              }),
            }
          );

          if (!addToOrderResponse.ok) {
            const error = await addToOrderResponse.json();
            throw new Error(`Failed to add to order: ${error.message}`);
          }
        }

        // Sau khi thêm vào đơn hàng, xóa tất cả sản phẩm trong giỏ hàng
        for (const item of cartItems) {
          const deleteResponse = await fetch(
            `http://10.18.7.18:8080/api/cartDetails/${item.id}`,
            {
              method: "DELETE",
            }
          );

          if (!deleteResponse.ok) {
            throw new Error(`Failed to delete cart item with id: ${item.id}`);
          }
        }

        // Xóa sản phẩm trong state sau khi xóa thành công trên server
        // setCartItems([]);

        // Hiển thị thông báo thanh toán thành công
        navigation.navigate("thank");

      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error adding products to order:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      
      {/* Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <View style={styles.card}>
          <Text style={styles.textBold}>Kathryn Murphy</Text>
          <Text>2464 Royal Ln. Mesa, New Jersey 45463</Text>
          <Text>(302) 555-0107 - (406) 555-0120</Text>
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.orderSummary}>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text>{item.product.title}</Text>
              <Text style={styles.textGray}>{item.quantity} items</Text>
            </View>
          ))}
          <Text style={styles.totalAmount}>Total: ${totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.card}>
          {['Cash on Delivery', 'Paypal', 'Apple Pay', 'Credit Card'].map((method) => (
            <TouchableOpacity
              key={method}
              style={styles.radioButton}
              onPress={() => setPaymentMethod(method)}
            >
              <View
                style={[
                  styles.radioOuter,
                  paymentMethod === method && styles.radioOuterSelected,
                ]}
              >
                <View
                  style={[
                    styles.radioInner,
                    paymentMethod === method && styles.radioInnerSelected,
                  ]}
                />
              </View>
              <Text>{method}</Text>
            </TouchableOpacity>
          ))}
          {paymentMethod === 'Credit Card' && (
            <TextInput
              style={styles.creditCardInput}
              placeholder="**** **** **** 67/00 /000"
              keyboardType="numeric"
            />
          )}
        </View>
      </View>

      {/* Delivery Time */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Time</Text>
        <View style={styles.deliveryRow}>
  <Text style={styles.deliveryLeft}>Estimated Delivery</Text>
  <Text style={styles.deliveryRight}>1 Hour, 25 Mins</Text>
</View>

      </View>

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payNowButton} onPress={handleAddToOrder}>
        <Text style={styles.payNowText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
    color: '#d1786a',
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, // Khoảng cách dưới hàng
  },
  deliveryLeft: {
    fontSize: 16,
    color: 'black', // Chữ bên trái màu đen
  },
  deliveryRight: {
    fontSize: 16,
    color: '#d1786a', // Chữ bên phải màu hồng nhạt
    fontWeight: 'bold',
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d1786a',
    textAlign: 'center',
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d1786a',
  },
  card: {
    backgroundColor: '#fcece6',
    padding: 15,
    borderRadius: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textGray: {
    color: 'gray',
  },
  orderSummary: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalAmount: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d1786a',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1786a',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#d1786a',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  radioInnerSelected: {
    backgroundColor: '#d1786a',
  },
  creditCardInput: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  deliveryTime: {
    fontSize: 16,
    color: '#d1786a',
    marginBottom: 5,
  },
  payNowButton: {
    backgroundColor: '#d1786a',
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom:20,
    marginBottom: 30,
  },
  payNowText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    
  },
});

export default CheckoutScreen;
