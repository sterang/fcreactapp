import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';

function Suggestion(props){
    return(
        <TouchableOpacity
            onPress={props.onPress}
        >
            <View style={styles.container}>
            <View style={styles.right}>
                <Text style={styles.title}>Actividad: {props.nombre_actividad}</Text>
                <Text style={styles.teacher}>Nota Quiz: {props.nota}</Text>
                <Text style={styles.teacher}>Nota Evaluation: {props.notaEvaluation}</Text>
                <Text style={styles.teacher}>Nota Actividad: {props.totalNota}</Text>
                <Progress.Bar progress={props.progresso} width={300} height={12} color="#FFFFFF"  />
                
                <Text style={styles.curso}></Text>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: '#42A5F5',
        borderRadius:5,
        height: 150,
        overflow: 'hidden',
        marginBottom: 20,
        marginLeft: 10,
        marginRight:10
    },
    cover:{
        marginTop:10,
        height:100,
        width:100,
        resizeMode: 'cover',
        borderRadius:5,
        overflow: 'hidden'
    },
    left:{
        paddingLeft:10,
    },
    right:{
        paddingLeft:10,
        justifyContent: 'space-between',
        
    },
    title:{
        marginTop:10,
        fontSize: 18,
        color: '#44546b',
        fontWeight:'bold',
        width: 300
    },  
    curso:{
        fontSize:11,
        color: 'white',
        fontWeight:'bold',
        marginBottom:10,
    },
    teacher:{
        
        fontSize: 14,
        color: '#6b6b6b',
        fontWeight:'bold'

    },
    progressBarF:{
        height:10
    }
})
export default Suggestion;