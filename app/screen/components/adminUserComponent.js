import React from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
function Suggestion(props){
    console.log("Imprimiendo URLs");
    return(
        <TouchableOpacity
            onPress={props.onPress}
        >
            <View style={styles.container}>
            <View style={styles.right}>
                <Text style={styles.teacher}>Estudiante: {props.nombre_estudiante} {props.apellido_estudiante}</Text>
                <Text style={styles.curso}>Grado: {props.grado_estudiante}</Text>
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
        height: 120,
        overflow: 'hidden'
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
        fontWeight:'bold'
    },  
    curso:{
        fontSize:15,
        marginRight: 5,
        color: 'white',
        fontWeight:'bold',
        textAlign: 'justify',
        marginBottom:50,
    },
    teacher:{
        marginTop:20,
        marginRight: 5,
        fontSize: 17,
        color: '#6b6b6b',
        fontWeight:'bold'

    }
})
function mapStateToProps(state){
    return{
      ipconfig: state.videos.selectedIPConfig
    }
  }
export default connect(mapStateToProps) (Suggestion);