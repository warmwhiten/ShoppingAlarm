import React, {Component} from 'react';
import axios from 'axios';
import {
    View,
    Text,
    ListView,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import { StackActions, NavigationActions } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SettingScreen extends Component{
    _navigate(){
        this.props.navigation.navigate('SomethingScreen');
    }

    _checkLogout(){
        Alert.alert(
            "Alert",
            "Are you sure?",
            [
                {text: 'ok', onPress: this._logout()},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
    }

    _logout(){
        axios.get('http://3.133.45.80:3000/api/users/logout')
        .then(function (response) {
        console.log(response);
         })
        .catch(function (error) {
        console.log(error);
         });
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._navigate.bind(this)}>
                    <Text>🏅 Something</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._checkLogout.bind(this)}>
                    <Text>🔓 Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapButton: {
        width: wp('100%'),
        height: hp('8%'),
        paddingLeft: wp('8%'),
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    }
})