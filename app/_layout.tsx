import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useEffect } from 'react';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import OnboardingScreen from './Screens/OnboardingScreen';
import SinginScreen from './Screens/singin';
import _TabLayout from './Screens/tab_layout';
import SingupScreen from './Screens/singup';
import HelpScreen from './Screens/help';
import PaymentMethod from './Screens/payment';
import CartScreen from './Screens/checkout';
import CheckoutScreen from './Screens/checkout2';
import ThankYouScreen from './Screens/thank';
import ProductScreen from './Screens/product_detail';
import AddCardScreen from './Screens/addCard';
import MyOrdersScreen from './Screens/myorder';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OrderDetails from './Screens/OrderDetails';
import OrderDetailsmain from './Screens/OrderDetails-main';
import ChangePasswordScreen from './Screens/changepassword';
// import IntroScreen from './Screens/intro';





const Stack = createNativeStackNavigator();

const _layout = () => {

    // useFonts({
    //     'outfit': require('./../assets/fonts/NunitoSans-ExtraBold.ttf'),
    //     'outfit': require('./../assets/fonts/NunitoSans-ExtraBold.ttf')

    // })
    useFonts({
        'outfit-bold': require('./../assets/fonts/NunitoSans-ExtraBold.ttf'),
        'outfit-regular': require('./../assets/fonts/Poppins-Regular.ttf'),
        'outfit-semibold': require('./../assets/fonts/Poppins-SemiBold.ttf')

    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Onboar">
                {/* 
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={App} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={_TabLayout} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Complete" component={CheckoutCompleteScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyCart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyOrder" component={MyOrderScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductAll" component={ProductAllScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CategoryAll" component={CategoryAllScreen} options={{ headerShown: false }} />
<Stack.Screen name="Detail" component={ProductDetailScreen} options={{ headerShown: false }} />       
                <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Start" component={OnboardingScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Onboar" component={OnboardingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={SinginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={_TabLayout} options={{ headerShown: false }} />
                <Stack.Screen name="Singup" component={SingupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={PaymentMethod} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout2" component={CheckoutScreen} options={{ headerShown: false }} />
                <Stack.Screen name="thank" component={ThankYouScreen} options={{ headerShown: false }} />
                <Stack.Screen name="detail" component={ProductScreen} options={{ headerShown: false }} />
                <Stack.Screen name="addcard" component={AddCardScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Myorder" component={MyOrdersScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
                <Stack.Screen name="OrderDetailsmain" component={OrderDetailsmain} options={{ headerShown: false }} />
                <Stack.Screen name="Change" component={ChangePasswordScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default _layout

const styles = StyleSheet.create({})