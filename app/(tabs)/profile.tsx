import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }: { navigation: any }) => {

  const [user, setUser] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://10.18.7.18:8080/api/users");
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
        }
        const data = await response.json();
        const userData = data.content[0];
        setUser({ username: userData.username, email: userData.email });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    Alert.alert("Thông báo", "Bạn đã đăng xuất thành công");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity>
          <FontAwesome name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('@/assets/images/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.username}</Text>
        <Text style={styles.profileId}>ID: {user.email}</Text>
      </View>

      {/* 3 nút đầu tiên giữ nguyên */}
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Wishlist')}>
          <FontAwesome name="heart" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('OrderDetailsmain')}>
          <FontAwesome name="list" size={20} color="#FFF" />
          <Text style={styles.buttonText}>My Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Các nút khác có thể cuộn */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <View style={{ display:'flex', flexDirection:'row' }}>
            <FontAwesome name="lock" size={19} style={{ textAlign:'center', color:'#F28D35'}}/>
            <Text style={styles.menuTitle}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Payment')}>
          <View style={{ display:'flex', flexDirection:'row' }}>
            <FontAwesome name="credit-card" size={19} style={{ textAlign:'center', color:'#F28D35'}}/>
            <Text style={styles.menuTitle}>Payment Methods</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Change')}>
          <View style={{ display:'flex', flexDirection:'row' }}>
            <FontAwesome name="bell" size={19} style={{ textAlign:'center', color:'#F28D35'}}/>
            <Text style={styles.menuTitle}>ChangePasswoss</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <View style={{ display:'flex', flexDirection:'row' }}>
            <FontAwesome name="cog" size={19} style={{ textAlign:'center', color:'#F28D35'}}/>
            <Text style={styles.menuTitle}>Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
          <View style={{ display:'flex', flexDirection:'row' }}>
            <FontAwesome name="info-circle" size={19} style={{ textAlign:'center', color:'#F28D35'}}/>
            <Text style={styles.menuTitle}>Help</Text>
          </View>
        </TouchableOpacity>

        {/* Log out Button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <View style={{ display:'flex', flexDirection:'row' }}>
            <FontAwesome name="sign-out" size={19} style={{ textAlign:'center', color:'#F28D35'}}/>
            <Text style={styles.menuTitle}>Log out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileId: {
    color: '#888',
  },
  profileOptions: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#F28D35',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  menuItem: {
    marginBottom: 20, 
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 18,
  },
});
export default ProfileScreen;
