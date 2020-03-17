import React,{Component} from 'react';
import{FlatList,Text,View, StyleSheet} from 'react-native';
import Layout from '../../components/suggestion-list-layout';
import Empty from '../../components/empty';
import Separator from '../../components/separator';
import Suggestion from '../components/adminUserComponent';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

function mapStateToProps(state){
    return {
        students: state.videos.students,
        duda: state.videos.duda,
        ipconfig: state.videos.selectedIPConfig
    }
}
class SuggestionList extends Component {
    renderEmpty=()=><Empty text="No hay materias asociadas al colegio"></Empty>
    itemSeparatos=()=><Separator text="No hay materias asociadas al colegio"></Separator>
    viewContenido=(item)=>{
        this.props.dispatch({
            type:'SET_STUDENT_ADMIN',
            payload:{
                studentAdmin: item,
            }
        })
        console.log(this.props.dispatch)
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'ConfigureAdmin'
        }))
        //console.log(this.props.dispatch)
    }
    renderItem=({item})=>{
        return(
            <Suggestion {...item}
            onPress={()=>{this.viewContenido(item)}}
            />
        )
    }
    keyExtractor = item=>item.id_estudiante.toString()
    render(){
        var data = [];
        //console.log("Esto es para el filtro");
        data = this.props.students;
        console.log("Cargando Datos");
        console.log(data);
        return(
            <Layout title="Estudiantes Del Colegio">
            <FlatList
                keyExtractor={this.keyExtractor}
                data={data}
                ListEmptyComponent= {this.renderEmpty}
                ItemSeparatorComponent={this.itemSeparatos}
                renderItem={this.renderItem}
            />
            </Layout>
        );
    }
}
export default connect(mapStateToProps) (SuggestionList);