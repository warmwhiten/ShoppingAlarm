import React, {Component} from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class LoginScreen extends Component{


    constructor(props){
        super(props)
        console.log("생성자");
    }

    state = {
        email: "",
        password : "",
    };

    changeEmail = (text) => {
        this.setState({ email : text });
    };
    
    changePassword = (text) => {
        this.setState({ password : text });
    };

    static navigationOptions = {
        header: null,
    };
    
    _doLogin() {
        const pp = this.props;
        axios.post('http://3.133.45.80:3000/api/users/login', {
            email : this.state.email,
            password : this.state.password    
        },{withCredentials: true})
          .then(function (res) {
            console.log(res);
            if(res.data.loginSuccess === false){
                alert('로그인에 실패하였습니다.')
            }
            else {
                console.log(res);
                pp.navigation.replace('TabNavigator');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    goJoinScreen(){
        this.props.navigation.navigate('Join');
    }


    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Nintendo Switch Shopping Alarm</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.TextInput} 
                        placeholder={"e-mail"}
                        onChangeText={this.changeEmail}
                        value={this.state.email}
                        />
                    <TextInput 
                        style={styles.TextInput} 
                        placeholder={"Password"}
                        onChangeText={this.changePassword}
                        value={this.state.password}
                        />
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button1}
                        onPress={this._doLogin.bind(this)}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View/>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button2}
                        onPress={()=> this.goJoinScreen()}>
                        <Text style={styles.buttonTitle}>Join</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'center',
    },
    titleArea: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('10%'),
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        height: hp('7%'),
        paddingBottom: '2%',
    },
    button1: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        backgroundColor: "#747474",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
})