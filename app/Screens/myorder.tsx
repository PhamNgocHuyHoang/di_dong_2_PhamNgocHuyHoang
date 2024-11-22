import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

// Mock data for orders
const orders = [
  {
    id: 1,
    status: 'Delivered',
    date: 'May 15',
    items: [
      {
        name: 'Serenity Nightstand',
        description: 'In a laoreet purus. Integer turpis quam...',
        price: 7.50,
        quantity: 1,
        image: require('@/assets/images/b4.png'), // Replace with your image path
      }
    ],
    total: 7.50,
  },
  {
    id: 2,
    status: 'Canceled',
    date: 'May 22',
    items: [
      {
        name: 'Blue Table Lamp',
        description: 'In a laoreet purus. Integer turpis quam...',
        price: 25,
        quantity: 2,
        image: require('@/assets/images/b1.png'), // Replace with your image path
      }
    ],
    total: 50,
  },
  {
    id: 3,
    status: 'Delivered',
    date: 'June 04',
    items: [
      {
        name: 'Bedroom Dresser',
        description: 'In a laoreet purus. Integer turpis quam...',
        price: 285,
        quantity: 1,
        image: require('@/assets/images/b2.png'), // Replace with your image path
      }
    ],
    total: 285,
  },
  {
    id: 4,
    status: 'Delivered',
    date: 'June 12',
    items: [
      {
        name: 'Green Bed',
        description: 'In a laoreet purus. Integer turpis quam...',
        price: 285,
        quantity: 2,
        image: require('@/assets/images/b3.png'), // Replace with your image path
      }
    ],
    total: 285,
  },
];

const MyOrdersScreen = ({ navigation }: { navigation: any }) => {



  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://10.18.7.18:8080/api/orders");
        const result = await response.json();
        setOrders(result.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Hiển thị nếu đang tải
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#fa6a0a" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  // Hiển thị nếu không có đơn hàng
  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have no orders at the moment.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Categories")}
        >
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }


  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      {/* Order status and date */}
      <View style={styles.orderHeader}>
        <Text style={styles.orderStatus}>Order: {item.status}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>

      {/* Items list */}
      {orders.map((order, index) => (
        <View key={index} style={styles.productContainer}>
          {/* <Image source={product.image} style={styles.productImage} /> */}
          <View style={styles.productDetails}>
            <Text style={styles.productName}>           {order.id}            </Text>
            <Text style={styles.productDescription}>User ID: {order.user.id}</Text>
            <Text style={styles.productPrice}>Date: {order.date}</Text>
            {/* <Text style={styles.productQuantity}>{product.quantity}x uds.</Text> */}
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("OrderDetails", { orderId: order.id })
            } // Truyền order.id
          >
            <Text style={styles.detailButtonText}>View Details</Text>
          </TouchableOpacity>
          {/* <View style={styles.productActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.actionIcon}>🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.actionIcon}>➕</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      ))}


      {/* Order total */}
      {/* <Text style={styles.orderTotal}>Total:</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.ordersList}
      />

      {/* Bottom Navigation */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backIcon: {
    fontSize: 24,
    color: '#999',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#FF6B6B',
  },
  ordersList: {
    paddingHorizontal: 16,
  },
  orderContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderStatus: {
    fontWeight: 'bold',
    color: '#999',
  },
  orderDate: {
    fontWeight: 'bold',
    color: '#999',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 12,
    color: '#999',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 12,
    color: '#999',
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  actionIcon: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  orderTotal: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
});

export default MyOrdersScreen;
