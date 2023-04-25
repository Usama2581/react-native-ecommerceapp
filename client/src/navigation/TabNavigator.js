import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Shop from '../screens/Shop'
import Cart from '../screens/Cart'
import Icons from '@expo/vector-icons/Ionicons'
import { Feather } from '@expo/vector-icons';
import StackNavigation from './StackNavigation'


const TabNavigator = ({ navigation }) => {

    const Tab = createBottomTabNavigator()

    // useEffect(() => {

    // }, [])/


    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: 'white',
                    borderTop: 1,
                },
                tabBarLabelStyle: {
                    fontSize: 0,
                },
                headerStyle: {
                    borderBottomWidth: 1, // Add a border at the bottom
                    // borderBottomColor: '#ccc', // Choose your desired border color
                },
            }}
        >
            <Tab.Screen
                name='home'
                component={Home}
                options={({ route }) => ({
                    headerShown: false,

                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                {focused && <View style={styles.activeTabItemIndicator}></View>}
                                <Icons
                                    name="home-outline"
                                    size={30}
                                    color={focused ? "black" : '#8F8F8F'}
                                />
                            </>
                        );
                    },
                })
                }

            />
            <Tab.Screen
                name="Shop"
                component={Shop}
                options={({ navigation }) => ({
                    headerLeft: () => {
                        return (
                            <Icons
                                onPress={() => navigation.goBack()}
                                name="arrow-back-outline"
                                size={30}
                                color="#282828"
                                style={{ position: 'relative', left: 10 }}
                            />
                        )
                    },
                    headerRight: () => {
                        return (
                            <Icons
                                onPress={() => navigation.goBack()}
                                name="search-outline"
                                size={25}
                                color="#282828"
                                style={{ position: 'relative', right: 15 }}
                            />
                        )
                    },
                    headerTitleAlign: 'center',

                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                {focused && <View style={styles.activeTabItemIndicator}></View>}
                                <Icons
                                    name="cart-outline"
                                    size={30}
                                    color={focused ? "black" : '#8F8F8F'}
                                />
                            </>
                        );
                    },
                }
                )}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={({ navigation }) => ({
                    headerLeft: () => {
                        return (
                            <Icons
                                onPress={() => navigation.goBack()}
                                name="arrow-back-outline"
                                size={30}
                                color="#282828"
                                style={{ position: 'relative', left: 10 }}
                            />
                        )
                    },
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                {focused && <View style={styles.activeTabItemIndicator}></View>}
                                <Feather name="shopping-bag" size={26} color={focused ? "black" : '#8F8F8F'} />
                            </>
                        );
                    },
                })}

            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={({ navigation }) => ({
                    headerLeft: () => {
                        return (
                            <Icons
                                onPress={() => navigation.goBack()}
                                name="arrow-back-outline"
                                size={30}
                                // color="black"
                                color="#282828"
                                style={{ position: 'relative', left: 10 }}
                            />
                        )
                    },
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                {focused && <View style={styles.activeTabItemIndicator}></View>}
                                <Icons
                                    name="person-outline"
                                    size={30}
                                    color={focused ? "black" : '#8F8F8F'}
                                />
                            </>
                        );
                    },
                })}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    activeTabItemIndicator: {
        position: 'absolute',
        top: 0,
        left: '15%',
        //   right: 0,
        height: 2,
        backgroundColor: 'black',
        width: '70%'
    },
});

