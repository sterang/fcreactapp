import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, WebView , Linking} from 'react-native';
//import shorthash from 'shorthash';
//import { Video } from 'expo-av';
//import { MaterialIcons, Octicons } from '@expo/vector-icons';
//import * as FileSystem from 'expo-file-system';
//import PDFReader from 'rn-pdf-reader-js';
import Constants from 'expo-constants'
import {connect} from 'react-redux';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db5.db");

//const PdfReader = ({ url: uri }) => <WebView style={{ flex: 1 }} source={{ uri }} />
class Player extends Component{
    constructor(props) {
      super(props);
    }
    state = {
      mute: false,
      shouldPlay: false,
      storage: null,
      storageFilter:null,
      storageFlats: null,
    }
    componentDidMount(){
      db.transaction(tx => {
        tx.executeSql(
          "create table if not exists events (id_evento integer primary key not null, data_start text, hour_start text, data_end text, hour_end text, id_actividad int, id_estudiante int, check_download int, check_inicio int, check_fin int, check_answer int, count_video int, check_video int, check_document int, check_a1 int, check_a2 int, check_a3 int, check_profile int, check_Ea1 int, check_Ea2 int, check_Ea3 int );"
        );
        tx.executeSql(
          "create table if not exists flatEvent (id_evento integer not null, upload int);"
        );
        tx.executeSql("select * from events", [], (_, { rows: { _array } }) =>
          this.setState({ storage: _array })
        );
        tx.executeSql(
          `select * from flatEvent ;`,
          [],
          (_, { rows: { _array } }) => this.setState({ storageFlats: _array })
        );
        tx.executeSql(
          `select * from events where id_estudiante=? and id_actividad=?;`,
          [this.props.student.id_estudiante, this.props.activity.id_actividad],
          (_, { rows: { _array } }) => this.setState({ storageFilter: _array })
        );
      });  
    }
    almacenaMetrica(){
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var dataComplete = date+'/'+month+'/'+year;
      var hours = new Date().getHours();
      var min = new Date().getMinutes();
      var hoursComplete = hours+':'+min;
      db.transaction(tx => {
          tx.executeSql(
            `select * from events where id_estudiante=? and id_actividad=?;`,
              [this.props.student.id_estudiante,this.props.activity.id_actividad],
            (_, { rows: { _array } }) => this.setState({ storageFilter: _array })
          );
      });
      console.log("Storage Print")
      console.log(this.state.storageFilter);
      var storageFilterGood = this.state.storageFilter;
      var storageFilter = storageFilterGood.reverse();
      console.log("Imprimiendo Resultado")
      //console.log(storageFilter);
  
      console.log(storageFilterGood);
      if(storageFilter.length==0){
        console.log("Entro a Cero")
          resultado = [{
            check_a1: 0,
            check_a2: 0,
            check_a3: 0,
            check_Ea1: 0,
            check_Ea2: 0,
            check_Ea3: 0,
            check_inicio: 0,
            count_video: 0,
            check_download:0,
            check_answer:0
          }]
      }
      if(storageFilter.length!=0){
          resultado = Array.from(new Set(storageFilter.map(s => s.id_actividad)))
          .map(id_actividad => {
            return {
              id_actividad: id_actividad,
              data_start: storageFilter.find(s => s.id_actividad === id_actividad).data_start,
              count_video: storageFilter.find(s => s.id_actividad === id_actividad).count_video,
              check_a1: storageFilter.find(s => s.id_actividad === id_actividad).check_a1,
              check_a2: storageFilter.find(s => s.id_actividad === id_actividad).check_a2,
              check_a3: storageFilter.find(s => s.id_actividad === id_actividad).check_a3,
              check_Ea1: storageFilter.find(s => s.id_actividad === id_actividad).check_Ea1,
              check_Ea2: storageFilter.find(s => s.id_actividad === id_actividad).check_Ea2,
              check_Ea3: storageFilter.find(s => s.id_actividad === id_actividad).check_Ea3,
              check_answer: storageFilter.find(s => s.id_actividad === id_actividad).check_answer,
              check_download: storageFilter.find(s => s.id_actividad === id_actividad).check_download,
              check_inicio: storageFilter.find(s => s.id_actividad === id_actividad).check_inicio,
              id_evento: storageFilter.find(s => s.id_actividad === id_actividad).id_evento,
            };
          });
      }
      db.transaction(
          tx => {
            tx.executeSql("insert into events (data_start, hour_start, data_end, hour_end, id_actividad, id_estudiante, check_download, check_inicio, check_fin, check_answer, count_video, check_video, check_document, check_a1, check_a2, check_a3, check_profile, check_Ea1, check_Ea2, check_Ea3) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",
             [dataComplete,hoursComplete,dataComplete,hoursComplete, this.props.activity.id_actividad, this.props.student.id_estudiante,resultado[0].check_download,resultado[0].check_inicio,0,resultado[0].check_answer,resultado[0].count_video+1,1,0,resultado[0].check_a1,resultado[0].check_a2,resultado[0].check_a3,0,resultado[0].check_Ea1,resultado[0].check_Ea2,resultado[0].check_Ea3]);
          },
          null,
          null
      );
      db.transaction(tx => {
          tx.executeSql(
            `select * from events ;`,
              [],
            (_, { rows: { _array } }) => this.setState({ storage: _array })
          );
      });
      //console.log(this.state.storage [this.state.storage.length-1]);
      this.update();    
  }
  updateFlat(){
    db.transaction(tx => {
        tx.executeSql(
          `select * from flatEvent ;`,
          [],
          (_, { rows: { _array } }) => this.setState({ storageFlats: _array })
        );
      });
    console.log(this.state.storageFlats);
  }
  update() {
      db.transaction(tx => {
        tx.executeSql(
          `select * from events ;`,
          [],
          (_, { rows: { _array } }) => this.setState({ storage: _array })
        );
      });
      console.log(this.state.storage[this.state.storage.length-1]);
      db.transaction(
          tx => {
            tx.executeSql(`insert into flatEvent (id_evento, upload) values (?, ?)`,
            [this.state.storage[this.state.storage.length-1].id_evento,0]);
          },
          null,
          null
      );
      db.transaction(tx => {
          tx.executeSql(
            `select * from flatEvent ;`,
            [],
            (_, { rows: { _array } }) => this.setState({ storageFlats: _array })
          );
        });
        this.updateFlat();
  }
    _handlePress = () => {
      this.almacenaMetrica();
      var uristring = this.props.urldocumento;
      var ip = this.props.ipconfig;
      var uri = 'http://'+ip+":3000"+uristring.substr(28);
    
      Linking.openURL(uri);
      this.props.onPress && this.props.onPress();
    };
    render() {
      //const url = this.props.descripcion_CREA;
      //console.log(this.props.descripcion_CREA);
      return (
        <View style={styles.container}>
          <Text {...this.props} onPress={this._handlePress}>
            Download Your PDF
          </Text>
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
      video:{
          left:0,
          right:0,
          bottom:0,
          top:0,
          width:400,
          height: 200
      },
      container:{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
      }
  })
  function mapStateToProps(state){
    return{
      ipconfig: state.videos.selectedIPConfig,
      activity:state.videos.selectedActivity,
      student:state.videos.selectedStudent
    }
  }
  export default connect(mapStateToProps) (Player);
  