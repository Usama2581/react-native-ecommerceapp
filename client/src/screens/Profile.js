import { Image, StyleSheet, Text, View } from 'react-native'
import Picture from '../components/Picture'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Profile () {

  // const user = useSelector(state => state.userReducer.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState('')

  
  useEffect(() => {
    const getUser = async () => {
      try {
        const name = await AsyncStorage.getItem('name')
        const userName = JSON.parse(name)
        setName(userName)
        // console.log('drawer', user)
        const email = await AsyncStorage.getItem('email')
        const userEmail = JSON.parse(email)
        setEmail(userEmail)
      } catch (e) {
        console.error(e.message)
      }

    }
    getUser()
  }, [])

  return (
    <View style={styles.page_wrapper}>
      <View style={styles.page}>

        <View style={styles.personal_info}>
          <View style={styles.image_box}>
            <Picture screen={'profile'} />
          </View>
          <View style={styles.data_box}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>


        <View style={styles.content}>
          <Text style={styles.text} >My orders</Text>
          <Ionicons name='chevron-forward-outline' size={30} />
        </View>

        <View style={styles.content}>
          <Text style={styles.text} >Shipping Address</Text>
          <Ionicons name='chevron-forward-outline' size={30} />
        </View>

        <View style={styles.content}>
          <Text style={styles.text} >Payment Method</Text>
          <Ionicons name='chevron-forward-outline' size={30} />
        </View>
        <View style={styles.content}>
          <Text style={styles.text} >My reviews</Text>
          <Ionicons name='chevron-forward-outline' size={30} />
        </View>
        <View style={styles.content}>
          <Text style={styles.text} >Settings</Text>
          <Ionicons name='chevron-forward-outline' size={30} />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page_wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // backgroundColor: ''
  },
  page: {
    width: '90%',
    // borderWidth: 2,
    height: '90%',
  },
  personal_info: {
    width: '100%',
    height: 170,
    display: 'flex',
    flexDirection: 'row',
    // borderWidth: 2,
    justifyContent: 'flex-start'
  },
  image_box: {
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100
  },
  data_box: {
    justifyContent: 'center',
    marginLeft: 10,
    // borderWidth: 2,
  },
  name: {
    fontSize: 25,
    fontFamily: 'Poppins-Medium',
    marginBottom: -5
  },
  email: {
    fontSize: 13,
    color: 'grey',
    fontFamily: 'Poppins-Light',
  },
  content: {
    padding: 10,
    // borderWidth: 2,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
    // shadow color
    // shadowColor: "#000",
    //iOS
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.2,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium'
  }
})