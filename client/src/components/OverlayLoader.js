// import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native';



export default function OverlayLoader({ visible }) {
    // console.log(visible)
    if (!visible) return null;
    return (
        <View style={styles.overlay}>
            {/* <View style={styles.loader}> */}
            <ActivityIndicator size="large" color='#FAD16B' />
        </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        // ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    //   loader: {
    //     backgroundColor: '#fff',
    //     borderRadius: 5,
    //     padding: 20,
    //   },
})