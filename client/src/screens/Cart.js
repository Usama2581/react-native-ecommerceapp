import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Stars from '../components/Stars'
import { Swipeable } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function Cart({ navigation }) {

  const [data, setData] = useState('')

  useEffect(() => {
    const getData = async () => {
      console.log('useEffect chala-------------->')

      const tempEmail = await AsyncStorage.getItem('email')
      const email = JSON.parse(tempEmail)
      // console.log(email)

      axios.get(`http://192.168.3.108:3000/cart/${email}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err))

    }

    getData()

  }, [])


  const rightSwipe = () => {
    return (
      <Pressable style={styles.delete_box} onPress={() => alert('')} >
        <Ionicons name="trash-outline" color='#FAD16B' size={35} />
      </Pressable>
    )
  }


  const renderProducts = ({ item }) => {

    return (
      <Swipeable renderRightActions={rightSwipe}>
        <Pressable style={styles.product}
          onPress={() => navigation.navigate('Details', { item, screen: 'cart' })} >
          <View style={styles.product_image_box}>
            <Image
              resizeMode='cover'
              source={{ uri: item.thumbnail }}
              style={styles.product_image}></Image>
          </View>
          <View style={styles.content_box}>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>Rs. {item.price}</Text>

            <Text style={styles.oldPrice}>Rs. {Math.round(item.price + (item.price * item.discountPercentage) / 100)}</Text>

            <Stars rating={item.rating} size={15} />
          </View>
        </Pressable>
      </Swipeable>

    )

  }


  return (
    <View style={styles.page}>
      <View style={styles.product_box}>
        {/* <Text style={styles.product_text}>{route.params}</Text> */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderProducts}
          resizeMode='contain'
          ListEmptyComponent={
            <View style={{ height: 700, justifyContent: 'center' }}>
              <ActivityIndicator size='large' color='crimson' />
            </View>
          }

        />

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    // flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  product_box: {
    width: '95%',
    // borderWidth: 2,
    // height: '100%',
    // flex: 1,
    alignSelf: 'center',
    // marginTop: 20,
    marginBottom: 20,
    position: 'relative'
  },
  product: {
    // backgroundColor: '#282828',
    width: '95%',
    height: 120,
    // borderWidth: 2,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 7,
    elevation: 4,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 7,
    zIndex: 20,

  },
  product_image_box: {
    width: '40%',
    height: '100%',
    // alignSelf: 'flex-start'
  },
  product_image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // alignSelf: 'flex-start',
  },

  oldPrice: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#808080',
    textDecorationColor: '#808080',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 11,
    color: '#282828',
    fontFamily: 'Poppins-Medium',
  },
  price: {
    color: '#282828',
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    fontWeight: 'bold',
  },
  product_text: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize'
    // marginBottom: 0,
    // marginTop: 30,
  },
  content_box: {
    padding: 10
  },
  category_box: {
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
    // borderWidth: 2
  },
  category: {
    marginLeft: 10,
    backgroundColor: '#FAD16B',
    width: 140,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#282828',
    borderWidth: 2,
    // padding: 10,
  },
  category_text: {
    color: '#282828',
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    // marginBottom: 0,
    marginLeft: 17,
    textTransform: 'capitalize'
  },
  delete_box: {
    height: 120,
    backgroundColor: '#282828',
    // padding: 30,
    width: '95%',
    marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
    left: 8,
    zIndex: -10
  },
  itemSeparator: {
    // flex: 1,
    // height: 1,
    backgroundColor: 'red',
  },
})