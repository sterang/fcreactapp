import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { Ionicons , Octicons } from '@expo/vector-icons';
function HeaderReturn (props){
    return(
        <View>
            <SafeAreaView style={style.statusBar}></SafeAreaView>
            <View style={style.bar}>
                <View style={style.container}>
                    <TouchableOpacity onPress={props.onPress}>
                        <Ionicons name="md-arrow-back" size={32} color="white" style={style.menu}/>
                    </TouchableOpacity>
                    <View style={style.center}>
                        <Text style={style.texto}>{props.children}</Text> 
                    </View>
                </View>
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    menu:{
        width:30,
        height:30,
        marginTop: 10,
    },
    bar:{
        
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
export default HeaderReturn;