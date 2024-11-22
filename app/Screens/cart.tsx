import 'react-native-gesture-handler'; // Đưa lên đầu file
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"; 
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler'; // Thêm GestureHandlerRootView

const DATA = [
  { id: '1', title: 'CAPPUCCINO LATTE', image: require('@/assets/images/h1.png'), category: 'Winter special' },
  { id: '2', title: 'SILKY CAFE AU LAIT', image: require('@/assets/images/h2.png'), category: 'Decaff' },
  { id: '6', title: 'ICED CHOCOLATE', image: require('@/assets/images/h3.png'), category: 'Chocolate' },
];



const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.action}>
          <FontAwesome name="search" color="#020202" style={styles.smallIcon} />
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#ccc"
          />
          <FontAwesome name="bell" color="#111112" style={styles.smallIcon} />
          <FontAwesome name="bars" color="#0d0d0d" style={styles.smallIcon} />
        </View>
        <View style={styles.cartContent}>
    <Text style={styles.cartText}>Cart</Text>
    <FontAwesome name="shopping-cart" color="#080808" style={styles.smallIcon} />
    </View>
        <View style={styles.buttonContainer1}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recently</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Past Orders</Text>
        </TouchableOpacity>
        </View>
       
      </View>
      <View style={styles.container1}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.itemTitle}>{item.title || 'Không có tiêu đề'}</Text>
              
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#EEDCC6',
    padding: 10,
    height:170,
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
  buttonContainer1: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  heartContainer: {
    marginTop: 5,
  },
  container1: {
    flex: 1, // Đảm bảo container1 chiếm toàn bộ không gian
    backgroundColor: '#230C02', // Màu nền cho phần dưới
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  titleText: {
    marginLeft:10,
    fontSize: 20, // Kích thước chữ
    fontWeight: 'bold', // Đậm
    marginTop: 5, // Khoảng cách phía trên
    color: '#0f0f0f', // Màu chữ
  },
  titleText1: {
    marginLeft:10,
    fontSize: 10, // Kích thước chữ
    fontWeight: 'bold', // Đậm
    marginTop: 5, // Khoảng cách phía trên
    color: '#834D1E', // Màu chữ
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
    color: '#050505',
  },
  action: {
    flexDirection: 'row',
    padding: 14,
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
    padding: 10, // Giảm padding
    marginTop:10,
    marginRight:10,
    marginLeft:10,
  
    height: 100, // Thêm chiều cao cụ thể (tùy chọn)
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
});

export default App;