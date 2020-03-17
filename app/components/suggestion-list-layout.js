import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
function SuggestionListLayout(props){
    return(
        <View style={styles.container}>
            <View style={styles.contenedorVertical}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={styles.titleSincroniza}>
                    Sincroniza
                </Text>
            </TouchableOpacity>
        </View>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical: 10, 
        flex: 1
    },
    contenedorVertical:{
        flexDirection: 'row',

    },
    title:{
        color: '#4c4c4c',
        fontSize: 20,
        marginBottom:10,
        fontWeight:'bold',
        marginLeft:8
    },
    titleSincroniza:{
        color: '#4c4c4c',
        fontSize: 20,
        marginBottom:10,
        fontWeight:'bold',
        marginLeft:100

    }
})
export default SuggestionListLayout;