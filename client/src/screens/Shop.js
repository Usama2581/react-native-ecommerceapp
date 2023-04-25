import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Icons from '@expo/vector-icons/Ionicons'
import OverlayLoader from '../components/OverlayLoader'

export default function Shop({ navigation }) {

  const [data, setData] = useState([])
  // const [showLoader, setShowLoader] = useState(true)



  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(res => setData(res.data))
      .catch(err => console.log('err', err));
  }, []);


  return (
    <View style={styles.page}>
      {/* <ScrollView style={styles.item}> */}
      <Text style={styles.category_text}>Choose category</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate('Product', item)} key={item.id}>
              <Text style={styles.text}>{item}</Text>
            </Pressable>
          )
        }}
        ListEmptyComponent={
          <View style={{ height: 600, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='crimson' />
          </View>
        }
      />


      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center'
  },
  item: {
    width: '100%',
    height: '100%',
  },
  text: {
    borderBottomColor: '#9B9B9B',
    borderBottomWidth: 0.5,
    // borderWidth: 1,
    padding: 17,
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  category_text: {
    color: '#9B9B9B',
    fontSize: 17,
    padding: 15,
    fontFamily: 'Poppins-Medium'
  },

})