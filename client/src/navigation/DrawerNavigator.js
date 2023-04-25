import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home'
import Cart from '../screens/Cart'
import Orders from '../screens/Orders'
import Shop from '../screens/Shop'
import Settings from '../screens/Settings'
import Icons from '@expo/vector-icons/Ionicons'
import Profile from '../screens/Profile'
import CustomDrawer from './CustomDrawer'
import { SimpleLineIcons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator'
import StackNavigation from './StackNavigation'



export default function Drawer({ navigation }) {

    const Drawer = createDrawerNavigator();


    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            detachInactiveScreens={true}
            screenOptions={{
                drawerType: 'slide',
                drawerActiveBackgroundColor: '#535353', //label bg color
                drawerActiveTintColor: 'white',  //label color 
                drawerInactiveTintColor: 'white', //label color
                swipeEnabled: false,
                drawerLabelStyle: {
                    fontWeight: '300',
                    fontSize: 16,
                    marginLeft: -10,
                    fontFamily: 'Poppins-Light',
                    position: 'relative',
                    top: 2
                },
            }}>
            <Drawer.Screen name='Home' component={TabNavigator}
                options={{
                    drawerIcon: () => {
                        return <Icons name='home-outline' size={22} color='white' />
                    },
                    headerShown: false,
                    tabBarStyle: { display: 'flex' }
                }} />

            <Drawer.Screen name='Profile' component={Profile}
                options={{
                    drawerIcon: () => {
                        return <Icons name='person-outline' size={22} color='white' />
                    },
                    tabBarVisible: false
                }} />

            <Drawer.Screen name='Shop' component={Shop}
                options={{
                    drawerIcon: () => {
                        return <Icons name='cart-outline' size={23} color='white' />
                    }
                }} />

            <Drawer.Screen name='Orders' component={Orders}
                options={{
                    drawerIcon: () => {
                        return <Icons name='gift-outline' size={23} color='white' />
                    }
                }} />

            <Drawer.Screen name='My Cart' component={Cart}
                options={{
                    drawerIcon: () => {
                        return <SimpleLineIcons name="handbag" size={22} color="white" />
                    }
                }} />

            <Drawer.Screen name='Settings' component={Settings}
                options={{
                    drawerIcon: () => {
                        return <Icons name="settings-outline" size={22} color='white' />
                    }
                }} />
        </Drawer.Navigator>
    );
}

