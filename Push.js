import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Push(){
    return (
        <React.Fragment>
            <View style ={styles.container}>
            <Button title={'Press to Send Notification'} onPress={() => this.sendPushNotification()} />
            </View>
        </React.Fragment>
     );
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        justifyContent:"flex-end",
        paddingHorizontal: 20,
        paddingVertical: 100,
    }

})