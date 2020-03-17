import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { Ionicons , Octicons } from '@expo/vector-icons';
function Header (props){
    return(
        <View>
            
        </View>
    );
}
const style = StyleSheet.create({
    menu:{
        width:30,
        height:30,
        marginTop: 10,
    },
    statusBar:{
        marginTop:0,
        height: 0,
    },
    container:{
        backgroundColor: '#272D34',
        padding: 10,
        flexDirection: 'row'
    },
    center:{
        flex: 1,
        padding: 5,
        flexDirection:'row',
        justifyContent: 'flex-start'
    },
    texto:{
        color:'white',
        fontSize: 17,
        fontWeight:"bold",
        marginLeft: 20,
        marginTop: 10,
      }
})
export default Header;