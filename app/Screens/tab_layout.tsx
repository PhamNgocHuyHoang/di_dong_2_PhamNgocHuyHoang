import { Link, Tabs } from 'expo-router';
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

import AntDesign from '@expo/vector-icons/AntDesign';


import { useFonts } from 'expo-font';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../(tabs)/home2';
import MyProductScreen from '../(tabs)/product';
import MyOrdersScreen from '../(tabs)/mycart';
import DreamRoomScreen from '../(tabs)/dream';
import ProfileScreen from '../(tabs)/profile';



const Tab = createBottomTabNavigator();

const _TabLayout = ({ navigation }: { navigation: any }) => {
  useFonts({
    'outfit': require('./../../assets/fonts/NunitoSans-ExtraBold.ttf')
  })
  return (
 
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#E29547",
          headerShown: false,

        }}
      >

        <Tab.Screen name="Feed" component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              < Image
                source={
                  focused
                    ? require('./../../assets/images/Homed.png')
                    : require('./../../assets/images/Home1.png')
                }
                style={{ width: 24, height: 24 }}
              />
            ),
          
          }}

        />
        <Tab.Screen name="Product" component={MyProductScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/Categories2.png')
                    : require('./../../assets/images/Categoriesd.png')
                }
                style={{ width: 24, height: 24 }}
              />
            ),
           
          }}

        />
<Tab.Screen name="Cart" component={MyOrdersScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/Cart3.png')
                    : require('./../../assets/images/Cartn.png')
                }
                style={{ width: 27, height: 27 }}
              />
            ),
          
             
          }}


        />

        <Tab.Screen name="Favorites" component={DreamRoomScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/Wishlist2.png')
                    : require('./../../assets/images/Wishlist1.png')
                }
                style={{ width: 27, height: 27 }}
              />
            ),
            
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/Profile2.png')
                    : require('./../../assets/images/Profile1.png')
                }
                style={{ width: 27, height: 27 }}
              />
            ),
            
          }}

        />




      </Tab.Navigator>
  );
}


export default _TabLayout;