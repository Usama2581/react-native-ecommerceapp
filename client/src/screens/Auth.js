import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Keyboard } from "react-native"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedIn } from '../redux/actions/authAction';
import Loader from '../components/OverlayLoader';


export default function Auth({ navigation }) {

    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [screen, setScreen] = useState('login')
    const [form, setForm] = useState({})
    const [secureText, setSecureText] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [loading, setLoading] = useState()
    const dispatch = useDispatch()



    useEffect(() => {
        const showListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true)
        })
        const hideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false)
            // setIsFocused(false)
        })

        return () => {
            showListener.remove()
            hideListener.remove()
        }
    }, [])


    const changeScreen = () => {
        if (screen === 'login') {
            setScreen('register')
            setEmailError('')
            setPasswordError('')
        } else {
            setScreen('login')
            setNameError('')
            setEmailError('')
            setPasswordError('')
            setErrorMsg('')
        }

    }

    const updateFrom = (e, key) => {
        setForm({ ...form, [key]: e })


        // console.log('length', form.password.length)
        if (form.name) {
            if (form.name.length < 2) {
                setNameError('*Name is too short')
            }
            else {
                setNameError('')
            }

        }

        if (form.password && screen === 'register') {

            if (form.password.length < 5) {
                setPasswordError('*Pasword must be at least 6 characters long')
            }
            else {
                // console.log('true')
                setPasswordError('')
            }


        }
        if (form.password && screen === 'login') {

            if (form.password) {
                setPasswordError('')
            }
        }
        if (form.email) {
            setEmailError('')

        }
        // if (form.password) {
        //     setPasswordError('')
        // }
    }

    const validateEmail = () => {
        const email = form.email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = regex.test(email);
        // alert(result)
        if (result === false) {
            setEmailError('*Enter a valid email address')
        }
        else {
            setEmailError('')
        }
    }




    const login = async () => {

        if (!form.email) {
            setEmailError('*Email is required')
        }
        if (!form.password) {
            setPasswordError('*Password is required')
        }
        else {
            setLoading(true)
            axios.post('http://192.168.3.108:3000/users/login', form)
                .then(res => getRes(res))
                .catch(err => console.error('err', err.message))
        }
    }



    const register = () => {

        if (!form.name) {
            setNameError('*Name is required')
        }
        if (!form.email) {
            setEmailError('*Email is required')
        }
        if (!form.password) {
            setPasswordError('*Password is required')
        }
        else {
            setLoading(true)
            axios.post('http://192.168.3.108:3000/users/register', form)
                .then(res => getRes(res))
                .catch(err => console.error('err', err.message))
        }
    }


    const getRes = (res) => {

        const msg = res.data.message
        // console.log('msg', msg)
        if (msg === 'User doesnot exsist') {
            setErrorMsg(`*${msg}`)
            setLoading(false)
        }
        if (res.data.message === 'Email or password is incorrect') {
            setErrorMsg(`*${msg}`)
            setLoading(false)
        }
        if (msg === 'Loggedin') {
            setErrorMsg('')
            // alert('You are logged in')
            axios.get(`http://192.168.3.108:3000/users/${form.email}`)
                .then(async res => {
                    // dispatch(userData(res.data))
                    const tempToken = res.data.token.at(-1)
                    // console.log('temp', tempToken)
                    const token = JSON.stringify(tempToken)
                    // console.log('token', token)
                    await AsyncStorage.setItem('token', token)

                    const data = res.data
                    const { _id, email, name, picture } = data

                    const userName = JSON.stringify(name)
                    const userEmail = JSON.stringify(email)
                    const userId = JSON.stringify(_id)
                    const userPicture = JSON.stringify(picture)

                    await AsyncStorage.setItem('name', userName)
                    await AsyncStorage.setItem('email', userEmail)
                    await AsyncStorage.setItem('id', userId)
                    await AsyncStorage.setItem('picture', userPicture)
                    // console.log('user', name)
                    // await AsyncStorage.getItem('name')
                    // await AsyncStorage.getItem('email')
                    // await AsyncStorage.getItem('picture')
                    // await AsyncStorage.getItem('id')

                    dispatch(isLoggedIn(true))
                })
                .catch(err => console.error('err', err.message))
            // setLoading(false)
        }
        if (msg === `E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${form.email}" }`) {
            setEmailError('*User already exists')
            setLoading(false)
        }
        if (msg === 'registered') {
            // alert('You have registered successfully')
            setLoading(false)
            setScreen('login')
        }
    }


    return (
        <>
            <Pressable style={styles.page} >
                {
                    screen === 'register' && (
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Text style={styles.heading}>Create Account</Text>
                                <Text style={styles.sub_heading}>Create an account so you can explore all the products</Text>
                            </View>
                            <View style={styles.body}>

                                <Text style={styles.error}>{nameError}</Text>
                                <View style={styles.input_box}>
                                    <Text style={styles.label} >Full Name</Text>
                                    <TextInput
                                        cursorColor='#09D1C0'
                                        style={styles.input}
                                        keyboardType='email-address'
                                        onChangeText={(e) => updateFrom(e, 'name')}
                                    />
                                </View>

                                <Text style={styles.error}>{emailError}</Text>
                                <View style={styles.input_box}>
                                    <Text style={styles.label} >Email</Text>
                                    <TextInput
                                        cursorColor='#09D1C0'
                                        style={styles.input}
                                        keyboardType='email-address'
                                        onEndEditing={validateEmail}
                                        onChangeText={(e) => updateFrom(e, 'email')}
                                        onPressIn={() => {
                                            if (form.name) {
                                                setNameError('')
                                            }
                                            if (!form.name) {
                                                setNameError('*Name is required')
                                            }
                                        }}
                                    />
                                </View>


                                <Text style={styles.error}>{passwordError}</Text>
                                <View style={styles.input_box}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        onChangeText={(e) => updateFrom(e, 'password')}
                                        style={styles.input}
                                        secureTextEntry={secureText}
                                        cursorColor='#09D1C0'
                                        onPressIn={() => {
                                            if (!form.name) {
                                                setNameError('*Name is required')
                                            }
                                            if (!form.email) {
                                                setEmailError('*Email is required')
                                            }
                                        }
                                        }
                                    />

                                    <Ionicons name={secureText ? 'eye-off-outline' : 'eye-outline'}
                                        size={25}
                                        onPress={() => setSecureText(!secureText)}
                                        color='#282828'
                                        style={{ position: 'absolute', right: 20, top: '50%' }} />
                                </View>
                                {/* <Text style={styles.forget_password}>Forgot your password?</Text> */}
                                <Pressable onPress={register}
                                    style={styles.action_box_register}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>Register</Text>
                                </Pressable>
                                <Pressable onPress={changeScreen} >
                                    <Text style={styles.new_account} >Already have an account?</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }
                {
                    screen === 'login' && (
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Text style={styles.heading}>Login Here</Text>
                                <Text style={styles.sub_heading}>Welcome back you have</Text>
                                <Text style={styles.sub_heading}>been missed!</Text>
                            </View>
                            <View style={styles.body}>


                                <Text style={styles.error}>{emailError || errorMsg}</Text>
                                <View style={styles.input_box}>
                                    <Text style={styles.label} >Email</Text>
                                    <TextInput
                                        // value={'Usama@gmail.com'}
                                        style={styles.input}
                                        keyboardType='email-address'
                                        cursorColor='#09D1C0'
                                        onChangeText={(e) => updateFrom(e, 'email')}
                                        onEndEditing={validateEmail} />
                                </View>


                                <Text style={styles.error}>{passwordError}</Text>
                                <View style={styles.input_box}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        onPressIn={() => {
                                            if (form.email) {
                                                setEmailError('')
                                            }
                                            if (!form.email) {
                                                setEmailError('*Email is required')
                                            }
                                        }
                                        }
                                        onChangeText={(e) => updateFrom(e, 'password')}
                                        style={styles.input}
                                        secureTextEntry={secureText}
                                        // value={'123456'}
                                        cursorColor='#09D1C0' />

                                    <Ionicons name={secureText ? 'eye-off-outline' : 'eye-outline'}
                                        size={25}
                                        onPress={() => setSecureText(!secureText)}
                                        color='#282828'
                                        style={{ position: 'absolute', right: 20, top: '50%' }} />
                                </View>


                                <Text style={styles.forget_password}>Forgot your password?</Text>
                                <Pressable onPress={login}
                                    style={styles.action_box_login}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>Login</Text>
                                </Pressable>


                                <Pressable style={''} onPress={changeScreen} >
                                    <Text style={styles.new_account} >Create new account</Text>
                                </Pressable>

                            </View>
                        </View>
                    )

                }
                {
                    keyboardVisible ? null
                        :
                        (
                            <View style={styles.footer} >
                                <Text style={styles.text}>Or login with social account</Text>
                                <View style={styles.icon_box}>
                                    <View style={styles.icon}>
                                        <Image source={require('../../assets/google.png')} style={styles.image}></Image>
                                    </View>
                                    <View style={styles.icon}>
                                        <Image source={require('../../assets/fb.png')} style={styles.image}></Image>
                                    </View>
                                </View>
                            </View>

                        )
                }

            </Pressable>
            <Loader visible={loading} />
            {/* <Loader visible={true} /> */}
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        zIndex: -10
    },
    container: {
        width: '90%',
        height: '100%',
        // borderWidth: 1,
        alignSelf: 'center',
    },
    header: {
        width: '100%',
        height: 150,
        // borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    heading: {
        fontSize: 40,
        fontFamily: 'OpenSans-Bold',
        marginBottom: 7,
    },
    sub_heading: {
        fontSize: 17,
        // fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        // marginBottom: 0,
        textAlign: 'center'
    },
    body: {
        // height: 350,
        // borderWidth: 2,
        marginTop: 10
    },
    input_box: {
        // borderWidth: 2,
        // backgroundColor: '#282828'
        backgroundColor: '#F1F6F7',
        position: 'relative',
        // marginTop: 12,
        // marginBottom: 0,
        padding: 10,
        borderRadius: 10
    },
    input: {
        // width: '80%',
        // borderWidth: 1,
        // height: 40,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginLeft: 5
    },
    label: {
        // padding: 5,
        fontFamily: 'Poppins-Regular',
        fontSize: 13
    },
    action_box_login: {
        backgroundColor: '#FAD16B',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // marginTop: 25
    },
    action_box_register: {
        backgroundColor: '#FAD16B',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 25
    },
    forget_password: {
        alignSelf: 'flex-end',
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        marginTop: 15
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        // borderWidth: 2,
        width: '100%',
        height: 130,
        // display: 'flex',
        // flexDirection: 'row',
        // zIndex: -10
    },
    text: {
        alignSelf: 'center',
        // alignSelf: 'flex-end',
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
        // zIndex: -10,
        fontSize: 15
    },
    icon_box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: '#F1F6F7',
        height: 60,
        width: 60,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    image: {
        width: 35,
        height: 35,
    },
    new_account: {
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
        fontSize: 15
    },
    error: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'red',
        marginTop: 10
    }
})