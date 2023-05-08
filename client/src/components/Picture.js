import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useTransition } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from "expo-image-picker";
import axios from "axios"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { uploadImage } from '../config/firebase';
import Loader from './Loader';
// import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { userImage } from '../redux/actions/userImageAction';

export default function Picture(props) {

    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [image, setImage] = useState()
    const [loader, setLoader] = useState(false)
    // console.log(props.screen)
    let screen = props.screen

    const pic = useSelector(state => state.userImageReducer.image)

    useEffect(() => {
        // console.log('useEffect() called')
        getUser();
    }, [pic])
    // console.log(data)
    const getUser = async () => {
        try {
            const result = await AsyncStorage.getItem('picture')
            if(data) {
                setData('')
            }
            const user = JSON.parse(result)
            setData(user)
            // console.log('drawer', user)
        } catch (e) {
            console.error(e.message)
        }
    }

    const changeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log("result", result);
        let picture
        if (!result.canceled) {
            picture = result.assets[0].uri;
        }
        // console.log("result", picture);

        try {
            setLoader(true)
            const url = await uploadImage(picture)
            // console.log("uri", url);
            const userId = await AsyncStorage.getItem('id')
            const id = JSON.parse(userId)
            // console.log("id", id)

            const userEmail = await AsyncStorage.getItem('email')
            const email = JSON.parse(userEmail)
            // console.log("email", email)


            axios.patch(`http://192.168.3.108:3000/users/${id}`, { picture: url })
                .then(async res => {
                    if (res.data.message === 'User updated') {
                        await AsyncStorage.removeItem('picture')
                        axios.get(`http://192.168.3.108:3000/users/${email}`)
                            .then(async res => {
                                if (res.data) {
                                    const data = res.data
                                    // delete data.token
                                    const { picture } = data
                                    // console.log(picture)
                                    const user = JSON.stringify(picture)
                                    // console.log('stringify', user)
                                    await AsyncStorage.setItem('picture', user)
                                    dispatch(userImage(picture))
                                    setData(url)
                                    setLoader(false)
                                    // getUser()
                                }
                            })
                            .catch(err => console.log(err.message))
                    }
                })
                .catch(err => console.error('err', err.message))

        } catch (e) {
            console.log('err', e.message);
        }

    }

    return (
        <>
            {
                loader ?
                    <Pressable style={styles.loader_box}>
                        <Loader style={{
                            width: '100%',
                            height: '100%',
                            // backgroundColor: 'red',
                            justifyContent: 'center',
                        }} />
                    </Pressable>
                    :
                    <Pressable style={styles.image_box}>
                        {data ? (
                            <Image source={{ uri: data }} style={styles.image} />
                        ) : (
                            <Loader />
                        )}
                        {
                            screen === 'profile' &&
                            <Pressable
                                onPress={changeImage}
                                style={styles.plus_sign_overlay}>
                                {/* <Text style={styles.plus}>+</Text> */}
                                {/* <FontAwesome name="pencil-square-o" size={24} color="black" /> */}
                                <Ionicons name="pencil" size={18} color="#282828" />
                            </Pressable>
                        }
                    </Pressable>
            }
        </>
    )
}

const styles = StyleSheet.create({
    image_box: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 130,
        // marginTop: 50,
        // marginLeft: 50,
        borderRadius: 100,
        marginBottom: 10,
        // borderWidth: 3,
        // borderColor: 'red',
        // zIndex: 10
    },
    loader_box: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 130,
        // marginTop: 50,
        // marginLeft: 50,
        borderRadius: 100,
        marginBottom: 10,
        // borderWidth: 3,
        // borderColor: 'red',
        // zIndex: 10
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    image: {
        width: 130,
        height: 130,
        zIndex: -10,
        borderWidth: 2,
        borderColor: '#FAD16B',
        borderRadius: 100
    },
    plus_sign_overlay: {
        position: 'absolute',
        // bottom: 10,
        top: 5,
        left: 2,
        height: 35,
        width: 35,
        // backgroundColor: '#282828',
        // backgroundColor: '#FAD16B',
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FAD16B'
        // borderColor: '#282828',
    },
    plus: {
        color: 'white',
        fontSize: 19,
        color: '#FAD16B'
    }
})