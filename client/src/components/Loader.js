import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'


export default function Loader(props) {
    // console.log('props:', props.style)
    const design = props.style

    if (!design) return null

    return (
        <View style={styles.design}>
            {/* <View style={{ width: '100%', borderWidth: 3, height: 300, }}> */}
            {/* <Text>Loader</Text> */}
            <ActivityIndicator color='crimson' size='large' />
        </View>
    )
}

const styles = StyleSheet.create({})