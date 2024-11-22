import React from 'react';
import { FontAwesome } from "@expo/vector-icons"; 
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,StatusBar,TextInput } from 'react-native';

const CartScreen = () => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <View style={styles.action}>
      <FontAwesome name="search" color="#121012" style={styles.smallIcon} />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        placeholderTextColor="#ccc"
      />
      <FontAwesome name="bell" color="#060606" style={styles.smallIcon} />
      <FontAwesome name="bars" color="#070707" style={styles.smallIcon} />
    </View>
    <View style={styles.container}>
    <View style={styles.cartContainer}>
    <View style={styles.cartContent}>
    <Text style={styles.cartText}>Cart</Text>
    <FontAwesome name="shopping-cart" color="#080808" style={styles.smallIcon} />
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recently</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Past Orders</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
      {/* Closest Cafe Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Closest cafe:</Text>
        <Text style={styles.cafeName}>Co/Choc Tebet (1.5 km)</Text>
        <Text style={styles.cafeAddress}>Jl. Santuy no. 41, Tebet Barat, Tebet, Jakarta Selatan</Text>
        
        <View style={styles.line} />
        <Text style={styles.sectionTitle}>Deliver to:</Text>
        <Text style={styles.address}>No saved address</Text>
        <TouchableOpacity>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Order Section */}
      <View style={styles.section2}>
        <Text style={styles.sectionTitle}>Your order:</Text>
        <View style={styles.orderItem}>
          <Image
            source={require('@/assets/images/h1.png')}
            style={styles.itemImage}
          />
          <Text>1x CAPPUCCINO LATTE</Text>
          <Text>£4.95</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <Text style={styles.sectionTitle}>Other drinks we recommend</Text>
        <ScrollView horizontal>
          <View style={styles.recommendItem}>
            <Image
                      source={require('@/assets/images/picture_checkout1.png')} 
              style={styles.itemImage2}
            />
          </View>
          <View style={styles.recommendItem}>
            <Image
              source={require('@/assets/images/picture_checkout2.png')} 
              style={styles.itemImage2}
            />

          </View>
        </ScrollView>
      

      
        
      <Text style={styles.text}>Subtotal:                                            £4.95</Text>
      <Text style={styles.text}>Delivery fee:                                      £1.95</Text>
      <Text style={styles.text}>Packaging fee:                                 £2.95</Text>
      <Text style={styles.text}>Total:                                                  £9.85</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EDE2',
    padding: 10,
  },
  line: {
    width: '80%', // Chiều rộng của đường gạch ngang
    height: 2, // Chiều cao của đường gạch ngang
    backgroundColor: 'black', // Màu sắc của đường gạch ngang
  },
  cartContainer: {
    flexDirection: 'column',// Căn giữa
    
  },
  cartContent: {
    flexDirection: 'row', // Đặt các phần tử theo chiều ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  cartText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    backgroundColor: '#d3b9a8',
    borderRadius: 5,
    padding: 10,
  },
  iconText: {
    fontSize: 24,
  },
  container1: {
    flex: 1, // Đảm bảo container1 chiếm toàn bộ không gian
    backgroundColor: '#230C02', // Màu nền cho phần dưới
  },
  buttonContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18, // Kích thước chữ lớn hơn
    marginVertical: 5, // Khoảng cách giữa các dòng
  },
  bannerContainer: {
    width: '100%',
    height: 150, // Chiều cao của banner
    overflow: 'hidden',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    color: '#420475',
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#E5CBAF',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcf9f6',
    borderRadius: 10,
    padding: 20, // Giảm padding
    marginTop:20,
    marginRight:10,
    marginLeft:10,
  
    height: 60, // Thêm chiều cao cụ thể (tùy chọn)
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    width:380,
    
  },
  section2: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: -10,
    width:380,
    
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cafeName: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  cafeAddress: {
    color: '#888',
  },
  address: {
    color: '#888',
    marginBottom: 8,
  },
  editButton: {
    color: '#F28D35',
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemImage2: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  recommendItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  priceSummary: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
  },
});

export default CartScreen;
