import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

// Mock data for orders
const orders = [
  {
    id: 1,
    status: "Delivered",
    date: "May 15",
    items: [
      {
        name: "Serenity Nightstand",
        description: "In a laoreet purus. Integer turpis quam...",
        price: 7.5,
        quantity: 1,
        image: require("@/assets/images/b4.png"), // Replace with your image path
      },
    ],
    total: 7.5,
  },
  {
    id: 2,
    status: "Canceled",
    date: "May 22",
    items: [
      {
        name: "Blue Table Lamp",
        description: "In a laoreet purus. Integer turpis quam...",
        price: 25,
        quantity: 2,
        image: require("@/assets/images/b1.png"), // Replace with your image path
      },
    ],
    total: 50,
  },
  {
    id: 3,
    status: "Delivered",
    date: "June 04",
    items: [
      {
        name: "Bedroom Dresser",
        description: "In a laoreet purus. Integer turpis quam...",
        price: 285,
        quantity: 1,
        image: require("@/assets/images/b2.png"), // Replace with your image path
      },
    ],
    total: 285,
  },
];

const MyOrdersScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        setCartItems([]);

        // Hiển thị thông báo thanh toán thành công
        Alert.alert(
          "Thanh toán thành công",
          "Đơn hàng của bạn đã được tạo thành công!",
          [{ text: "OK", onPress: () => navigation.navigate("thank") }]
        );
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error adding products to order:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(
            "http://10.18.7.18:8080/api/cartDetails"
          );
          const result = await response.json();
          setCartItems(result.content); // Assuming the cart items are in the `content` field
          setLoading(false);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          setLoading(false);
        }
      };

      fetchCartItems();
      return () => {
        setCartItems([]); // Clear cart items when screen is unfocused (optional)
      };
    }, [])
  );

  // Increase quantity of an item
  const increaseQuantity = async (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;

    try {
      await fetch(
        `http://10.18.7.18:8080/api/cartDetails/${newCartItems[index].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newCartItems[index],
            quantity: newCartItems[index].quantity,
          }),
        }
      );
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Decrease quantity of an item
  const decreaseQuantity = async (index: number) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;

      try {
        await fetch(
          `http://10.18.7.18:8080/api/cartDetails/${newCartItems[index].id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...newCartItems[index],
              quantity: newCartItems[index].quantity,
            }),
          }
        );
        setCartItems(newCartItems);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Remove item from cart
  const removeItem = async (index: number) => {
    const itemToRemove = cartItems[index];
    try {
      await fetch(
        `http://10.18.7.18:8080/api/cartDetails/${itemToRemove.id}`,
        {
          method: "DELETE",
        }
      );
      const newCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const renderRightActions = (index: number) => (
    <TouchableOpacity
      onPress={() => removeItem(index)}
      // style={styles.removeButton}
    >
      <MaterialCommunityIcons name="delete" size={30} color="white" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
      //  style={styles.loadingContainer}
      >
        <Text>Loading cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* Orders List */}
      <View style={styles.orderContainer}>
        {/* Order status and date */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderStatus}>Order:</Text>
          <Text style={styles.orderDate}></Text>
        </View>

        {/* Items list */}

        {cartItems.map((item, index) => (
          <View key={index} style={styles.productContainer}>
            <Image
              source={{
                uri: `http://10.18.7.18:8080/api/image/products/${item.product.photo}`,
              }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.product.title}</Text>
              <Text style={styles.productDescription}></Text>
              <Text style={styles.productPrice}>
                {" "}
                {item.product.price.toLocaleString("en-US")} $
              </Text>
              <Text style={styles.productQuantity}>{item.quantity}</Text>
            </View>
            <View style={styles.productActions}>
              <TouchableOpacity
                onPress={() => decreaseQuantity(index)}
                style={styles.iconButton}
              >
                <Text style={styles.actionIcon}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.actionIcon}> {item.quantity}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => increaseQuantity(index)}
                style={styles.iconButton}
              >
                <Text style={styles.actionIcon}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Order total */}
        <Text style={styles.orderTotal}>Total: $ {calculateTotalPrice()}</Text>
      </View>

      {/* Billing Details Section */}
      <View style={styles.billingContainer}>
        <View style={styles.separator} />

        <View style={styles.billingRow}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalText}>$ {calculateTotalPrice()}</Text>
        </View>

        {/* Checkout Button */}
        {/* <TouchableOpacity style={styles.checkoutButton}   onPress={handleAddToOrder}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity> */}
       <TouchableOpacity
  style={styles.checkoutButton}
  onPress={() =>
    navigation.navigate("Checkout2", {
      cartItems,
      totalAmount: calculateTotalPrice(),
    })
  }
>
  <Text style={styles.checkoutButtonText}>Checkout</Text>
</TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  billingContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Dành cho Android để có hiệu ứng bóng
  },

  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  backIcon: {
    fontSize: 24,
    color: "#999",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#FF6B6B",
  },
  ordersList: {
    paddingHorizontal: 16,
  },
  orderContainer: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderStatus: {
    fontWeight: "bold",
    color: "#999",
  },
  orderDate: {
    fontWeight: "bold",
    color: "#999",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  billingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  totalText: {
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 12,
    color: "#999",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productQuantity: {
    fontSize: 12,
    color: "#999",
  },
  productActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 5,
  },
  actionIcon: {
    fontSize: 18,
    color: "#FF6B6B",
  },
  orderTotal: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navIcon: {
    fontSize: 24,
    color: "#FF6B6B",
  },
});

export default MyOrdersScreen;
