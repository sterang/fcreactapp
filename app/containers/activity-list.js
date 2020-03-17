import React,{Component} from 'react';
import{FlatList} from 'react-native';
import Layout from '../components/suggestion-list-layout';
import Empty from '../components/empty';
import Separator from '../components/separator';
import Suggestion from '../components/activity';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as SQLite from 'expo-sqlite';

function mapStateToProps(state){
    return {
        subject:state.videos.selectedSubjects,
        list: state.videos.activity,
    }
}
class SuggestionList extends Component {
    renderEmpty=()=><Empty text="No hay actividades asociadas a la materia"></Empty>
    itemSeparatos=()=><Separator text="No hay actividades asociadas a la materia"></Separator>
    viewContenido=(item)=>{
        this.props.dispatch({
            type:'SET_SELECT_ACTIVITIES_SUBJECT_LIST',
            payload:{
                activity: item,
            }
        })
        console.log(this.props.dispatch)
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'SelectMoment'
        }))
    }
    state = {
        storage: [],
    }
    renderItem=({item})=>{
        return(
            <Suggestion {...item}
            onPress={()=>{this.viewContenido(item)}}
            />
        )
    }
    async componentDidMount(){
        var data = [];
        var id_materia= this.props.subject.id_materiaActiva;
        console.log("ID_Materia")
        console.log(id_materia);
        console.log("Esto es para el filtro");
        async function esActividad(elemento) {
            console.log("Imprimiendo IDs_MAteria de las actividades")
            console.log(elemento.id_materia)
            if (elemento.id_materiaActiva==id_materia){
                //console.log('_____________________________');
                data.push(elemento);
                //console.log(data);
            }else {
                //data.push(elemento);
                console.log('No entra');
            }
        }
        await this.props.list.filter(esActividad);
        console.log("Imprimiendo filtro")
        this.setState({ storage: data })
        console.log(this.state.storage);
    }
    async doubleSend(){
        this.filtro();
    }
    async filtro (){
        var data = [];
        var id_materia= this.props.subject.id_materiaActiva;
        console.log("ID_Materia")
        console.log(id_materia);
        console.log("Esto es para el filtro");
        async function esActividad(elemento) {
            console.log("Imprimiendo IDs_MAteria de las actividades")
            console.log(elemento.id_materia)
            if (elemento.id_materiaActiva==id_materia){
                //console.log('_____________________________');
                data.push(elemento);
                //console.log(data);
            }else {
                //data.push(elemento);
                console.log('No entra');
            }
        }
        await this.props.list.filter(esActividad);
        console.log("Imprimiendo filtro")
        this.setState({ storage: data })
        console.log(this.state.storage);
    }
    keyExtractor = item=>item.id_actividad.toString()
    render(){
        //console.log("Imprimiendo la materia Seleccionada");
        //console.log(this.props.subject.id_materia);
        //console.log("Terminando la materia seleccionada");
        var data = [];
        var id_materia= this.props.subject.id_materia;
        //console.log("Esto es para el filtro");
        //data = this.props.list;
        data = this.state.storage;
        //this.props.list.filter(esActividad);
        return(
            <Layout title="Tus Actividades"onPress={()=>this.doubleSend()}>
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