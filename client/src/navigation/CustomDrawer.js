import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerContentOverlay } from '@react-navigation/drawer'
import Icon from '@expo/vector-icons/Ionicons'
import Picture from '../components/Picture'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isLoggedIn } from '../redux/actions/authAction'
import OverlayLoader from '../components/OverlayLoader'

export default function CustomDrawer(props) {
    

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        // console.log('useEffect chala-------->')
        const getUser = async () => {
            try {
                const userName = await AsyncStorage.getItem('name')
                const name = JSON.parse(userName)
                setName(name)
            } catch (e) {
                console.error(e.message)
            }
        }
        getUser()
    }, [name])

    // console.log('picture', picture.name)

    const logout = async () => {
        setLoading(true)
        // setLoading(true)
        try {
            const picture = await AsyncStorage.getItem('token')
            const token = JSON.parse(picture)
            axios.delete(`http://192.168.3.108:3000/users/logout/${token}`)
                .then(res => getRes(res))
                .catch(err => console.log('err', err.message))
        } catch (error) {
            console.log('err', error.message)
        }
    }

    const getRes = async (res) => {
        const msg = res.data.message
        if (msg === 'Loggedout') {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('name')
            await AsyncStorage.removeItem('email')
            await AsyncStorage.removeItem('picture')
            // console.log('drawer',result, result1)
            console.log('Loggedout')
            dispatch(isLoggedIn(false))
        }
    }

    // const { name, email, picture } = picture



    return (
        <>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: '#282828', height: '100%' }}>
                <View style={styles.header_container}>
                    <View style={styles.header}>
                        {/* <Image source={require('../../assets/guest.png')}
                            style={styles.image}
                        ></Image> */}
                        <Picture />
                        <View style={styles.hellobox}>
                            <Text style={styles.hello}>Hello,</Text>
                            <Image source={require('../../assets/hand.png')}></Image>
                        </View>
                        <Text style={styles.name}>{name}.</Text>
                        {/* <Text style={styles.name}>{picture.name}.</Text> */}
                    </View>
                </View>
                <View style={styles.draweritem}>
                    <DrawerItemList {...props} />
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', paddingTop: 15 }}>
                    <View style={{ width: '70%', borderWidth: 1, borderColor: 'white' }} />
                </View>
                <TouchableOpacity style={styles.logoutbox}
                    onPress={logout} >
                    <Icon name='exit-outline' size={22} color='white' style={styles.icon} />
                    <Text style={styles.logout} >Logout</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
             <OverlayLoader visible={loading} />
        </>
    )
}


const styles = StyleSheet.create({
    header_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    header: {
        height: 250,
        width: '90%',
        justifyContent: 'flex-end',
    },
    hello: {
        fontSize: 25,
        // fontWeight: '300',
        fontFamily: 'OpenSans-Bold',
        color: 'white',
    },
    name: {
        color: 'white',
        fontSize: 25,
        // fontWeight: '600',
        fontFamily: 'Poppins-Light',
    },
    draweritem: {
        // height: 330,
        // backgroundColor: '#282828',
        paddingTop: 15,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginBottom: 10
    },
    hellobox: {
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: 'white'
    },
    logoutbox: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 30,
        // backgroundColor: 'red'
    },
    icon: {
        position: 'relative',
        left: 21,
    },
    logout: {
        position: 'relative',
        left: 45,
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Light',
    },

})