import React, {Component} from 'react';
import {
    SafeAreaView, FlatList,
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

const DATA = axios.get('http://3.133.45.80:3000/api/items')
.then(function (response) {
console.log(response);
 })
.catch(function (error) {
console.log(error);
 });

export default class HomeScreen extends Component{
    render(){
        return (
            <SafeAreaView style={styles.container}>
              <FlatList
                data={DATA}
                renderItem={({ item }) => (
                  <Item
                    title={item.title}
                    url={item.url}
                    isSoldout={item.isSoldout}
                  />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
              />
            </SafeAreaView>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
})