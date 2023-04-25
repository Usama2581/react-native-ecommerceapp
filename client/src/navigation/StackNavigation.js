import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
// import TabNavigator from '../components/TabNavigator'
import Details from '../screens/Details'
import Home from '../screens/Home'
import Drawer from './DrawerNavigator'
import Product from '../screens/Product'
import RenderProducts from '../components/RenderProducts'


export default function StackNavigation({ navigation }) {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='Tab' component={Drawer} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Homee" component={Home} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Details" component={Details} options={{
        headerShown: false,
        presentation: 'modal',
        animationTypeForReplace: 'push',
        // presentation: 'f',
        animation: 'slide_from_bottom'
      }} />
      <Stack.Screen name="Product" component={Product} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

