import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Sử dụng Icon AntDesign

const ThankYouScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Checkout2')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <TouchableOpacity>
          <AntDesign name="edit" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>

      {/* Biểu tượng tròn */}
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}></View>
        </View>
      </View>

      {/* Dòng cảm ơn */}
      <Text style={styles.thankYouText}>Thank You</Text>
      <Text style={styles.orderCompleteText}>Your Order Is Complete</Text>

      {/* Nút điều khiển */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.returnButtonText}>Return Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('OrderDetailsmain')}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d1786a',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#f5b8ae',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f5b8ae',
  },
  thankYouText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d1786a',
    marginTop: 20,
  },
  orderCompleteText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    marginBottom:20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  returnButton: {
    backgroundColor: '#f9eceb',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  trackButton: {
    backgroundColor: '#d1786a',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  returnButtonText: {
    color: '#d1786a',
    fontWeight: 'bold',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ThankYouScreen;
