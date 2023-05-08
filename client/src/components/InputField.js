import { StyleSheet, Text, View, TextInput, Animated, Pressable, Easing } from 'react-native'
import React, { useState, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'


export default function InputField({ label, onChangeText, nameError, emailError, type, width, screen, passwordError, secureText }) {

    const [position, setPosition] = useState(new Animated.Value(27))
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    const [passwordVisible, setPasswordVisible] = useState(secureText)
    const [text, setText] = useState()
    const labelRef = useRef()
    const inputRef = useRef()
    // console.log(msg)

    const focus = {
        color: '#282828',
        position: 'absolute',
        backgroundColor: 'white',
        fontSize: 14,
        padding: 4
    }

    const blur = {
        color: 'grey',
        position: 'absolute',
        padding: 2,
        fontSize: 17
        // bottom: 5,
        // top: null
    }

    const focusAnim = Animated.spring(position, {
        toValue: -16,
        duration: 1000,
        useNativeDriver: true,
        bounciness: 15,

    })

    const blurAnim = Animated.timing(position, {
        toValue: 25,
        duration: 200,
        useNativeDriver: true,
        // bounciness: 20
    })

    if (nameError || emailError || passwordError) {

        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            // bounciness: 30
            ease: Easing.bounce
        }).start()
    }

    const onInputFocus = () => {
        focusAnim.start()
        inputRef.current.setNativeProps({
            borderColor: '#282828'
        })
        labelRef.current.setNativeProps({
            style: focus
        })
    }

    const onInputBlur = () => {
        if (!text) {
            blurAnim.start()
            inputRef.current.setNativeProps({
                borderColor: 'grey'
            })
            labelRef.current.setNativeProps({
                style: blur
            })
        }
        else if (text) {
            inputRef.current.setNativeProps({
                borderColor: '#282828'
            })
            labelRef.current.setNativeProps({
                style: focus
            })
        }
    }


    const handleInput = (e) => {
        onChangeText(e)
        setText(e)
    }
    // console.log(passwordVisible)

    return (
        <View
            style={styles.inputBox}
            ref={inputRef} >
            <TextInput
                onFocus={onInputFocus}
                secureTextEntry={passwordVisible}
                onBlur={onInputBlur}
                style={[styles.input, { width: width }]}
                onChangeText={handleInput}
                keyboardType={type}
            // secureTextEntry={screen === 'password' ? true : false}
            />
            {
                screen === 'password' &&
                <Pressable style={styles.iconBox} onPress={() => setPasswordVisible(!passwordVisible)} >
                    <Ionicons name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size={23} color={'#282828'} />
                </Pressable>
            }
            <Animated.Text style={[styles.label, { transform: [{ translateY: position }] }]}
                ref={labelRef} >{label}</Animated.Text>
            <Animated.Text
                style={[styles.error, { opacity: opacity }]} >{nameError || emailError || passwordError}</Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        position: 'relative',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 35,
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        // backgroundColor: 'grey',
        padding: 12,
        // fontSize: 18,
        fontSize: 16,
        // borderRadius: 10,
        // backgroundColor: 'pink'
        fontFamily: 'Poppins-Regular',
    },
    label: {
        position: 'absolute',
        left: 13,
        // bottom: 5,
        color: 'grey',
        // backgroundColor: 'white',
        fontSize: 17,
        height: 25,
        padding: 2,
        fontFamily: 'Poppins-Regular',
    },
    error: {
        color: 'crimson',
        position: 'absolute',
        bottom: -25,
        left: 3,
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
    },
    iconBox: {
        width: '20%',
        justifyContent: 'center',
        // alignItems: 'center',
        // padding: 13
        // height: '100%',
    },
    icon: {
        // fontSize: 0
    }


})