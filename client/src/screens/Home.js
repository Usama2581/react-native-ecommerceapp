import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icons from '@expo/vector-icons/Ionicons'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import Stars from '../components/Stars';
import RenderProducts from '../components/RenderProducts';


export default function Home({ navigation }) {

  const [newArrival, setNewArrival] = useState([])
  const [trending, setTrending] = useState([])
  const [womenWear, setWomensWear] = useState([])




  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/mens-shirts?limit=8')
      .then(res => setTrending(res.data))
      .catch(err => console.log('err', err));
  }, []);


  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/womens-dresses?limit=8')
      .then(res => setWomensWear(res.data))
      .catch(err => console.log('err', err));
  }, []);



  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setNewArrival(res.data))
      .catch(err => console.log('err', err));
  }, []);




  return (
    <ScrollView style={styles.page}>
      <View style={styles.first_section_wrapper}>
        <View style={styles.first_section}>
          <View style={styles.header}>
            <Pressable style={styles.menu_box} onPress={() => navigation.openDrawer()}>
              <Icons name='grid-outline' size={30} color='#282828' />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Cart')}
              style={styles.cart_box}>
              <Feather name="shopping-bag" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.text_box}>
            <Text style={styles.text}>Let's find</Text>
            <Text style={styles.text}>Your Dream product !</Text>
          </View>
          <View style={styles.search_box}>

            <View style={styles.search}>
              <Icons name='search' size={25} color='#282828' style={styles.search_icon} />
              <TextInput
                style={styles.input}
                placeholder='Search' />
            </View>
            <View style={styles.filter_box}>
              <Icons name='filter-sharp' size={27} color='#282828' />
            </View>
          </View>

          <Image source={require('../../assets/discount.png')} style={styles.image}></Image>
        </View>
      </View>
      {/* <RenderProducts /> */}
      <RenderProducts data={{ title: 'mens wear', category: 'mens-shirts' }} />
      <RenderProducts data={{ title: 'sunglasses', category: 'sunglasses' }} />
      <RenderProducts data={{ title: 'womens bags', category: 'womens-bags' }} />
      <RenderProducts data={{ title: 'skincare', category: 'skincare' }} />
      <RenderProducts data={{ title: 'womens wear', category: 'womens-dresses' }} />
      <RenderProducts data={{ title: 'home decoration', category: 'home-decoration' }} />
      <RenderProducts data={{ title: 'mens shoes', category: 'mens-shoes' }} />
      {/* <RenderProducts data={'usama'} /> */}

    </ScrollView>


  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  first_section: {
    // borderWidth: 2,P
    width: '90%',
    height: 490
  },
  first_section_wrapper: {
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 2,
    height: 80,
    alignItems: 'center',
    // backgroundColor: 'white'
  },
  menu_box: {
    height: 50,
    width: 50,
    backgroundColor: '#F1F6F7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cart_box: {
    height: 50,
    width: 50,
    backgroundColor: '#F1F6F7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_box: {
    height: 100,
    justifyContent: 'flex-end',
    // borderWidth: 2
  },
  text: {
    // fontFamily: 'Anuphansemi',
    fontFamily: 'OpenSans-bold',
    // fontFamily: 'Antic',
    fontSize: 30,
    color: '#282828',
    lineHeight: 40,
  },
  search_box: {
    // borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    alignItems: 'center',
    height: 100
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '80%',
    padding: 5,
    backgroundColor: '#F1F6F7',
    borderRadius: 10,
    // borderWidth: 1
  },
  input: {
    width: 220,
    // borderWidth: 2,
    // height: 50,
    padding: 10,
    marginLeft: 5,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  filter_box: {
    height: 56,
    width: 56,
    backgroundColor: '#F1F6F7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  search_icon: {
    marginLeft: 10
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },


})