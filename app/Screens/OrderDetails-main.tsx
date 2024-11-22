import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

const OrderDetailsmain = ({ navigation }) => {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://10.18.7.18:8080/api/orderDetails`);
        const result = await response.json();
        setOrderDetails(result.content); // Giả sử `orderDetails` nằm trong `content`
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fa6a0a" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  // Ngày giờ hiện tại (sử dụng khi không có ngày giờ từ API)
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orderDetails.length > 0 && (
          <View style={styles.orderStatusContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.orderStatusLabel}>Order Status:</Text>
            <Text
              style={[
                styles.orderStatusValue,
                getOrderStatusStyle(orderDetails[0]?.order?.status || "Pending"),
              ]}
            >
              {orderDetails[0]?.order?.status || "Pending"}
            </Text>
          </View>
        )}

        {orderDetails.map((detail, index) => (
          <View key={index}>
            <View style={styles.orderDateContainer}>
              <Text style={styles.orderDateLabel}>Order Date:</Text>
              <Text style={styles.orderDateValue}>{`${formattedDate} at ${formattedTime}`}</Text>
            </View>
            <View style={styles.detailItem}>
              <Image
                source={{
                  uri: `http://10.18.7.18:8080/api/image/products/${detail.product.photo}`,
                }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{detail.product.title}</Text>
                <Text style={styles.productPrice}>
                  Price: {detail.product.price.toLocaleString()} ₫
                </Text>
                <Text style={styles.productQuantity}>Quantity: {detail.quantity}</Text>
                <Text style={styles.productTotal}>
                  Total: {(detail.product.price * detail.quantity).toLocaleString()} ₫
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const getOrderStatusStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return { color: "orange" };
    case "Delivered":
      return { color: "green" };
    case "Canceled":
      return { color: "red" };
    default:
      return { color: "#333" };
  }
};

export default OrderDetailsmain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    backgroundColor: "#f9f9f9",
  },
  backIcon: {
    fontSize: 24,
    color: "#999",
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  orderStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  orderStatusLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderStatusValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fa6a0a",
  },
  productQuantity: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  productTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fa6a0a",
    marginTop: 5,
  },
  orderDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  orderDateLabel: {
    fontSize: 16,
    color: "#333",
  },
  orderDateValue: {
    fontSize: 16,
    color: "#fa6a0a",
  },
});

