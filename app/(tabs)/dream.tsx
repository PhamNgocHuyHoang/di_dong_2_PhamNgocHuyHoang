import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const boardItems = [
  {
    id: 1,
    name: 'Serenity Nightstand',
    price: 150,
    image: require('@/assets/images/b1.png'), // Replace with your image path
  },
  {
    id: 2,
    name: 'Bedroom Dresser',
    price: 285,
    image: require('@/assets/images/b2.png'), // Replace with your image path
  },
  {
    id: 3,
    name: 'Blue Table Lamp',
    price: 25,
    image: require('@/assets/images/b3.png'), // Replace with your image path
  },
  {
    id: 4,
    name: 'Green Bed',
    price: 285,
    image: require('@/assets/images/b4.png'), // Replace with your image path
  },
];

const DreamRoomScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dream Room</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Text style={styles.headerActionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerActionIcon}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Board List */}
      <Text style={styles.sectionTitle}>My Board</Text>
      <FlatList
        data={boardItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.itemList}
      />

      {/* Add More Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add More</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
    
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backIcon: {
    fontSize: 24,
    color: '#999',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerActionIcon: {
    fontSize: 20,
    color: '#FF6B6B',
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemList: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#999',
  },
  deleteIcon: {
    fontSize: 20,
    color: '#FF6B6B',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom:30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
});

export default DreamRoomScreen;
