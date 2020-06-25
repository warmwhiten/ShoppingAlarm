import React, {useEffect, useState, Component} from 'react';
import {
    ActivityIndicator,
    SafeAreaView, 
    FlatList,
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';



export default HomeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get('http://3.133.45.80:3000/api/items')
        .then(({ data }) => {
          console.log(data)
          setData(data)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  
    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => {
              // console.log("index", index)
              return index.toString();
            }}
            renderItem={({ item }) => {
              return (
                  <View style = {styles.container}>
              <Text style={styles.text}> 판매처 : {item.title}</Text>
             <Text style={styles.text}>입고시간 : {item.board_date}</Text>
             <Text style={styles.text}> URL : {item.url}</Text>
               </View>
              )
            }}
          />
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.3,
        height: 85
    },
    text : {
        textAlignVertical: 'center',
        fontSize : 15,
    }
})