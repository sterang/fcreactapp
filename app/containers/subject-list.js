import React,{Component} from 'react';
import{FlatList,Text, Alert, TouchableOpacity} from 'react-native';
import Layout from '../components/suggestion-list-layout';
import Empty from '../components/empty';
import Separator from '../components/separator';
import Suggestion from '../components/subject';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as SQLite from 'expo-sqlite';
import API from '../../utils/api';
const db = SQLite.openDatabase("db5.db");
function mapStateToProps(state){
    return {
        list: state.videos.subject,
        ipconfig: state.videos.selectedIPConfig,
        student:state.videos.selectedStudent
    }
}
class SuggestionList extends Component {
    state={
        storage: null,
        storageFlats: null,
        storageFilter:null
    }
    componentDidMount(){
        db.transaction(tx => {
            tx.executeSql(
              "create table if not exists events (id_evento integer primary key not null, data_start text, hour_start text, data_end text, hour_end text, id_actividad int, id_estudiante int, check_download int, check_inicio int, check_fin int, check_answer int, count_video int, check_video int, check_document int, check_a1 int, check_a2 int, check_a3 int, check_profile int, check_Ea1 int, check_Ea2 int, check_Ea3 int );"
            );
            tx.executeSql(
                "create table if not exists flatEvent (id_evento integer not null, upload int);"
              );
            tx.executeSql("select * from events", [], (_, { rows:{ _array } }) =>
                this.setState({ storage: _array })
            );
            tx.executeSql(
                `select * from flatEvent ;`,
                [],
                (_, { rows: { _array } }) => this.setState({ storageFlats: _array })
              );
        });
    }
    updateFlat(){
        db.transaction(tx => {
            tx.executeSql(
              `select * from events ;`,
                [],
              (_, { rows: { _array } }) => this.setState({ storage: _array })
            );
            tx.executeSql(
                `select * from flatEvent ;`,
                [],
                (_, { rows: { _array } }) => this.setState({ storageFlats: _array })
            );
        });

    }
    async doubleSend(){
        this.sendServer();
        this.sendServer();
        this.sendServer();
    }
    async sendServer (){
        //this.consulta();
        const subject = await API.getCourses(this.props.ipconfig, this.props.student.grado_estudiante, this.props.student.id_colegio);
        this.props.dispatch({
          type:'SET_ACTIVITIES_LIST',
          payload:{
            subject
          }
        });
        db.transaction(tx => {
            tx.executeSql(
              `select * from events ;`,
                [],
              (_, { rows: { _array } }) => this.setState({ storage: _array })
            );
            tx.executeSql(
                `select * from flatEvent ;`,
                [],
                (_, { rows: { _array } }) => this.setState({ storageFlats: _array })
            );
        });
        
        this.updateFlat();
        var data = this.state.storage;
        var Flats = this.state.storageFlats;
        
        console.log("Trayendo Flats");
        console.log(Flats);
        for(var i = 0; i<Flats.length; i++){
            if(Flats[i].upload==0){
                for(var j=0; j<data.length; j++){
                    if(Flats[i].id_evento == data[j].id_evento){
                        var queryApi = await API.loadEventsLast(this.props.ipconfig);
                        queryApi = queryApi+1;
                        var id_estudianteF = ""+ this.props.student.id_estudiante + queryApi;
                        var id_estudianteF = parseInt(id_estudianteF);
                        data[j].id_evento= id_estudianteF;
                        var id_eventoFs = Flats[j].id_evento;
                        console.log("ID EVENTOS");
                        console.log(id_eventoFs);
                        db.transaction(tx => {
                            tx.executeSql(
                              `update flatEvent set upload = ? where id_evento = ? ;`,[1,id_eventoFs]);
                            tx.executeSql("select * from flatEvent", [], (_, { rows: { _array } }) =>
                                console.log(_array)
                            );
                        });
                        var dataEvents = data[j];
                        var query2 = await API.createEvents(this.props.ipconfig,dataEvents);
                        //tx.executeSql("update students set nombre_estudiante = ? , apellido_estudiante = ?, grado_estudiante = ?,curso_estudiante = ?, id_colegio = ?, nombre_usuario = ?, contrasena = ?, correo_electronico = ? where id_estudiante = ? ", [this.state.name,this.state.last_name,this.state.grado, 1, this.state.schoolSelected, this.state.user, this.state.password, this.state.email, this.props.student.id_estudiante]);
                    }
                }
            }
        }
        //console.log(data);
        //console.log(query2);
    }
    
    renderEmpty=()=><Empty text="No hay materias asociadas al colegio"></Empty>
    itemSeparatos=()=><Separator text="No hay materias asociadas al colegio"></Separator>
    viewContenido=(item)=>{
        this.props.dispatch({
            type:'SET_SELECT_ACTIVITIES_LIST',
            payload:{
                subject: item,
            }
        })
        //console.log(this.props.dispatch)
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'ActivitySubj'
        }))
    }
    
    renderItem=({item})=>{
        return(
            <Suggestion {...item}
            onPress={()=>{this.viewContenido(item)}}
            />
        )
    }
    keyExtractor = item=>item.id_materiaActiva.toString()
    render(){
        var data = [];
        console.log("Esto es para el filtro");
        data = this.props.list;
        return(
            <Layout title="Materias" onPress={()=>this.doubleSend()}>    
            
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