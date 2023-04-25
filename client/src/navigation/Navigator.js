import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './DrawerNavigator'
import StackNavigation from './StackNavigation'
import AuthNavigation from './AuthNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { isLoggedIn } from '../redux/actions/authAction'


export default function Navigator({ navigation }) {

  const dispatch = useDispatch()
  // const isLoggedIn = useSelector(state => console.log('nav-page', state.authReducer.status))
  // const isLoggedIn = true
  //  const [isLoggedIn, setIsLoggedIn] = useState()
  // console.log('nav', isLoggedIn)
  // let isLoggedIn;
  const authenticated = useSelector(state => state.authReducer.status)


  const getToken = async () => {
    // setTimeout(async () => {
    const value = await AsyncStorage.getItem('token')
    // console.log('token', value)
    if (value) {
      // alert('token')
      dispatch(isLoggedIn(true))
    }
    else {
      // alert("no token")
      dispatch(isLoggedIn(false))
    }

    // })
  }
  useEffect(() => {
    getToken()
  }, [authenticated])


  return (
    <NavigationContainer>
      {authenticated ? <StackNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  )
}


//put tab in drawer,  then drawer in stack navigation







