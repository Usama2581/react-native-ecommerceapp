import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '../screens/Auth'
import Home from '../screens/Home'

export default function AuthNavigation() {

    const Stack = createNativeStackNavigator()
    
  return (
    <Stack.Navigator>
      <Stack.Screen name='Auth' component={Auth}  options={{ headerShown: false }} />
      <Stack.Screen name="Homee" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

