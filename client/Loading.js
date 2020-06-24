import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading(){
    return (
        <React.Fragment>
            <View style={styles.container}>
            <Text style={styles.text}>Loading</Text>
            </View>
        </React.Fragment>
        );
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:"flex-end",
        paddingHorizontal: 20,
        paddingVertical: 100,
        backgroundColor: "#FDF6AA"
    },
    text: {
        color: "#2c2c2c",
        fontSize: 30
    }
})