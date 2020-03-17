import React,{Component} from 'react';
import {View, TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import API from '../../utils/api';
import {connect} from 'react-redux';
import { Ionicons , Octicons } from '@expo/vector-icons';
class Search extends Component{
    state={
        text:''
    }
    handleSubmit= async()=>{
        console.log(this.state.text);
        const content = await API.SearchContent(this.props.ipconfig,this.state.text);
        console.log(content);
        this.props.dispatch({
            type:'SET_CONTENTS_LIST',
            payload:
            {
                contenido: content
            }
        })
    }
    handleChangeText=async (text)=>{
        this.setState({
            text
        })
        const content = await API.SearchContent(this.props.ipconfig,this.state.text);
        this.props.dispatch({
            type:'SET_CONTENTS_LIST',
            payload:
            {
                contenido: content
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                placeholder="Busca tu Contenido"
                autoCorrect={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onSubmitEditing={this.handleSubmit}
                onChangeText={this.handleChangeText}
                style={styles.input}
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Ionicons name="md-search" size={50} color="gray" style={styles.menu}/>
                </TouchableOpacity>
            </View>
            

        )
    }
}

const styles = StyleSheet.create({
    input:{
        marginTop:2,
        marginLeft:4,
        padding: 15,
        fontSize:15,
        borderWidth:1,
        height: 50,
        width: 300,
        borderRadius:5,
        borderColor: '#eaeaea'

    },
    button:{
        flex: 1,
        padding: 2,
        marginLeft:4,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    container:{
        padding: 1,
        flexDirection: 'row'
    },
    menu:{
        marginLeft:2,
        width:50,
        height:50,
    },
})

function mapStateToProps(state){
    return{
        ipconfig: state.videos.selectedIPConfig
    }
  }
export default connect(mapStateToProps) (Search);

