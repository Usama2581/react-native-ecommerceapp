import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from '@expo/vector-icons/Ionicons'

export default function Stars({ rating,size }) {
    const stars = [];
    const newRating = Math.round(rating)
    // console.log('rating', newRating)

    for (let i = 0; i < newRating; i++) {
        stars.push(
            <Icons
                key={i}
                name="star"
                size={size}
                color="#FCC717"
            />
        );
    }
    for (let i = newRating; i < 5; i++) {
        stars.push(
            <Icons
                key={i}
                name="star"
                size={size}
                color="grey"
            />
        );
    }
    // console.log(props)
    return (
        <View>
            <Text>{stars}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})