import { StyleSheet, Text, View, FlatList, Image, StatusBar, Pressable, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import Stars from '../components/Stars'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Details({ route }) {

  const navigation = useNavigation()

  // console.log(route.params.item) 
  const [product, setProduct] = useState(route.params.item)
  const [screen, setScreen] = useState(route.params.screen)
  const [email, setEmail] = useState()

  // console.log(product)
  let { brand, description, price, title, rating, stock, category } = product

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product.title,
    });
  }, [navigation]);


  useEffect(() => {

    const getEmail = async () => {
      try {
        const tempEmail = await AsyncStorage.getItem('email')
        const email = JSON.parse(tempEmail)
        // console.log(email)
        setEmail(email)
      } catch (error) {
        console.log(error)
      }
    }

    getEmail()
  }, [])


  const addToCart = () => {
    // alert('')
    axios.post(`http://192.168.3.108:3000/cart/add`, { ...product, email: email })
      .then(async res => {
        if (res.data.message === 'added') {
          alert('Added to Cart')
        }
      })
      .catch(err => console.error(err))
  }



  return (
    <View style={styles.page}>
      <FlatList
        pagingEnabled={true}
        data={product.images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width: Dimensions.get('window').width }}>
              <Image
                source={{ uri: item }}
                style={{ width: '100%', height: 400, resizeMode: 'contain', }}
              // resizeMode='contain'
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.second_section_wrapper}>
        <View style={styles.second_section}>
          <Text style={styles.brand}>{category}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.brand}>{brand}</Text>

          <View style={styles.rating_box}>
            <Stars rating={rating} size={25} />
            <Text style={styles.rating}>{rating} out of 5</Text>
          </View>

          <Text style={styles.stock}>Remaining Items : {stock}</Text>
          <Text style={styles.heading_description} >Description</Text>
          <Text style={styles.description} >{description}. {description}</Text>
        </View>
      </View>

      <View style={styles.cart_box_warpper}>
        <View style={styles.cart_box}>
          <View style={styles.price_box}>
            <Text style={styles.price_text}>Price :</Text>
            <Text style={styles.price_value}>Rs. {price}</Text>
          </View>

          {screen === 'Home' &&
            <Pressable style={styles.cart} onPress={addToCart} >
              <Feather name="shopping-bag" size={22} color='#282828' />
              <Text style={styles.cart_text}>Add to cart</Text>
            </Pressable>
          }
          {screen === 'cart' &&
            <Pressable style={styles.cart}
              onPress={addToCart}  >
              <Ionicons name="cash-outline" size={23} color='#282828' />
              <Text style={styles.cart_text}>Buy Now</Text>
            </Pressable>
          }
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  second_section_wrapper: {
    width: '100%',
    alignItems: 'center',
    height: 400,
    backgroundColor: 'white',
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
  },
  second_section: {
    width: '95%',
    // borderWidth: 2,
    padding: 10,
  },
  cart_box_warpper: {
    width: '100%',
    backgroundColor: '#282828',
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  cart_box: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cart: {
    backgroundColor: '#FAD16B',
    width: '50%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  price_text: {
    color: '#FAD16B',
    fontFamily: 'Poppins-Light',
    marginBottom: -5
  },
  cart_text: {
    color: '#282828',
    fontFamily: 'Poppins-Medium'
  },
  price_value: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontWeight: '800',
    fontSize: 20
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    textTransform: 'capitalize'
  },
  brand: {
    fontSize: 15,
    color: '#9F9F9F',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize'
  },
  rating: {
    fontSize: 15,
    color: '#9B9B9B',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    marginTop: 5
  },
  stock: {
    fontSize: 15,
    color: '#282828',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    marginTop: 5
  },
  description: {
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: 'Poppins-Regular',

  },
  heading_description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    // color#F1F6F7
    // marginTop: 15
  },
  rating_box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    // borderWidth: 2,
    // height: 50
  }

})