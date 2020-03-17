import React,{Component} from 'react';
import { StyleSheet,Button, View, TouchableOpacity, Text, Modal, TextInput, Alert} from 'react-native';
import {connect} from 'react-redux';
import API from '../../../utils/api';
import HeaderReturn from '../../components/headerReturn';
import { LinearGradient } from 'expo-linear-gradient';
import {NavigationActions} from 'react-navigation';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db5.db");

class selectMoment extends Component{
    static navigationOptions=({navigation})=>{
        return{
            header: (<HeaderReturn onPress={()=>navigation.goBack()}>Selecciona El Lugar</HeaderReturn>)
        }
    }
    state={
        modalVisible: false,
        pregunta: null,
        storage: null
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
      
    detailActivity(){
        this.props.dispatch({
            type:'SET_SELECT_ACTIVITIES_SUBJECT_LIST',
            payload:{
                activity: this.props.activity,
             }
        })
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'DetailActivitySubj'
        }))
    }
    excersiceActivity(){
        if(this.props.activity.taller == 1){
            this.props.dispatch({
                type:'SET_SELECT_ACTIVITIES_SUBJECT_LIST',
                payload:{
                    activity: this.props.activity,
                 }
            })
            this.props.dispatch(NavigationActions.navigate({
                routeName: 'PlayExcersise'
            }))
        }else {
            Alert.alert(
                'Talller',
                'El taller no esta disponible en este momento',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
              );
        }
        
    }
    doubtActivity(){
        this.setModalVisible(true);
    }
    evaluationActivity(){
        if(this.props.activity.evaluacion == 1){
            this.props.dispatch({
                type:'SET_SELECT_ACTIVITIES_SUBJECT_LIST',
                payload:{
                    activity: this.props.activity,
                 }
            })
            this.props.dispatch(NavigationActions.navigate({
                routeName: 'EvaluationActivity'
            }))
        }else{
            Alert.alert(
                'Evaluacion',
                'La evaluación no esta disponible en este momento',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
              );
        }
        

    }
    componentDidMount(){
        db.transaction(tx => {
            tx.executeSql(
              "create table if not exists doubts (id_duda integer not null, id_actividad integer, id_estudiante integer, pregunta text, respuesta text, estado_duda int);"
            );
            tx.executeSql("select * from doubts", [], (_, { rows:{ _array } }) =>
                this.setState({ storage: _array }),
                console.log(this.state.storage)
            );
        });
    }
    registrateDoubt(){
        db.transaction(tx => {
            tx.executeSql("select * from doubts", [], (_, { rows:{ _array } }) =>
                this.setState({ storage: _array }),
                console.log(this.state.storage)
            );
        });
        var storageDoubts = this.state.storage;
        if(storageDoubts.length==0){
            id_doubt_cont = 1
        }else{
            id_doubt_cont = storageDoubts.length+1
        }
        id_duda=""+this.props.student.id_estudiante+id_doubt_cont;
        id_duda = parseInt(id_duda);
        dataDoubt={
            id_duda:id_duda,
            id_actividad: this.props.activity.id_actividad,
            id_estudiante: this.props.student.id_estudiante,
            pregunta: this.state.pregunta,
            respuesta: "",
            estado_duda: 1
        }
        db.transaction(tx => {
            tx.executeSql("insert into doubts (id_duda, id_actividad, id_estudiante, pregunta, respuesta, estado_duda) values (?, ?, ?, ?, ?, ?)",
             [id_duda,this.props.activity.id_actividad, this.props.student.id_estudiante, this.state.pregunta,"", 0]);
            tx.executeSql("select * from doubts", [], (_, { rows:{ _array } }) =>
                this.setState({ storage: _array }),
                console.log(this.state.storage)
            );
        });
        Alert.alert(
            'Almacenamiento',
            'Su duda ha sido almacenada por favor recuerde sincronizarla para tener alguna respuesta.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        );
    }
    async sincronizaDoubt(){
        db.transaction(tx => {
            tx.executeSql("select * from doubts", [], (_, { rows:{ _array } }) =>
                this.setState({ storage: _array })
                //console.log(this.state.storage)
            );
        });
        var storageDoubts = this.state.storage;
        console.log("Imprimiendo StorageDoubts");
        console.log(storageDoubts[0].id_duda);
        for (var i=0;i<storageDoubts.length;i++){
            if (storageDoubts[i].estado_duda==0){
                var dataDoubt= storageDoubts[i];
                var creacionDuda = await API.generateDoubt(this.props.ipconfig,dataDoubt);      
                var id_dudosa = storageDoubts[i].id_duda;
                db.transaction(tx => {
                    tx.executeSql("update doubts set estado_duda = ? where id_duda = ? ", [1, id_dudosa]);
                    tx.executeSql("select * from doubts", [], (_, { rows:{ _array } }) =>
                        this.setState({ storage: _array }),
                        console.log(this.state.storage)
                    );
                });     
                //tx.executeSql("update students set nombre_estudiante = ? , apellido_estudiante = ?, grado_estudiante = ?,curso_estudiante = ?, id_colegio = ?, nombre_usuario = ?, contrasena = ?, correo_electronico = ? where id_estudiante = ? ", [this.state.name,this.state.last_name,this.state.grado, 1, this.state.schoolSelected, this.state.user, this.state.password, this.state.email, this.props.student.id_estudiante]);
            }
        }
        Alert.alert(
            'Sincronización Exitosa',
            'Sus dudas fueron enviadas dentro de poco tendra una respuesta.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        );
        //var creacionDuda = await API.generateDoubt(this.props.ipconfig,dataDoubt);
        //console.log(this.state.storage);
    }
    render() {
        console.log(this.props.activity);
        return (
          <View style={styles.container}>
            <View style={styles.box0}>
            <Text style={styles.textActivity}>Nombre de la Actividad: {this.props.activity.titulo_actividad}</Text>
            <Text style={styles.textSelected}>Selecciona un Lugar para continuar: </Text>
            <TouchableOpacity style={styles.touchableButtonSignIn} onPress={() => this.detailActivity()}>
                    <LinearGradient
                        colors={['#272d34', '#0f2545', '#272d34']}
                        style={{ padding: 10, alignItems: 'center', borderRadius: 18, height: 40 }}>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#fff',
                                borderRadius: 16
                            }}>
                            PRACTICA EN CASA
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableButtonSignIn} onPress={() => this.excersiceActivity()}>
                    <LinearGradient
                        colors={['#272d34', '#0f2545', '#272d34']}
                        style={{ padding: 10, alignItems: 'center', borderRadius: 18, height: 40 }}>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#fff',
                                borderRadius: 16
                            }}>
                            PRACTICA EN CLASE
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableButtonSignIn} onPress={() => this.evaluationActivity()}>
                    <LinearGradient
                        colors={['#272d34', '#0f2545', '#272d34']}
                        style={{ padding: 10, alignItems: 'center', borderRadius: 18, height: 40 }}>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#fff',
                                borderRadius: 16
                            }}>
                            REALIZA TU EXAMEN
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
                <View style={styles.box}>
                <TouchableOpacity style={styles.touchableButtonSignIn} onPress={() => this.doubtActivity()}>
                    <LinearGradient
                        colors={['#272d34', '#0f2545', '#272d34']}
                        style={{ padding: 7, alignItems: 'center', borderRadius: 30, height: 50 }}>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: '#fff',
                                borderRadius: 30
                            }}>
                            ?
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>                    
                </View>
                <Modal
                 animationType="slide"
                 transparent={false}
                 visible={this.state.modalVisible}
                 onRequestClose={() => {
                 Alert.alert('Modal has been closed.');
                  }}>
          <View style={{ marginTop: 22, marginLeft: 30, }}>
            <View>
              <Text>Realiza tu pregunta:</Text>
                <TextInput style={styles.email} placeholder='Pregunta???'
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ pregunta: text })}
                >
                </TextInput>
                <TouchableOpacity style={{marginTop: 20, marginRight: 25, marginBottom: 20,}}
                  onPress={ ()=>this.registrateDoubt()
                }>
                  <LinearGradient
                        colors={['#272d34', '#0f2545', '#272d34']}
                        style={{ padding: 10, alignItems: 'center', borderRadius: 18, height: 40 }}>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#fff',
                                borderRadius: 16
                            }}>
                            GUARDA TU PREGUNTA
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20, marginRight: 25, marginBottom: 20,}}
                  onPress={ ()=>this.sincronizaDoubt()
                }>
                  <LinearGradient
                        colors={['#272d34', '#0f2545', '#272d34']}
                        style={{ padding: 10, alignItems: 'center', borderRadius: 18, height: 40 }}>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#fff',
                                borderRadius: 16
                            }}>
                            SINCRONIZA TU PREGUNTA
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20, marginRight: 25, marginBottom: 20}}
                  onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>  
                  <LinearGradient
                        colors={['#272d34', '#0f2545', '#272d34']}
                        style={{ padding: 10, alignItems: 'center', borderRadius: 18, height: 40 }}>
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#fff',
                                borderRadius: 16
                            }}>
                            CANCELAR
                        </Text>
                    </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          </View>
        );
      }
}
const styles = StyleSheet.create({
    email:{
        marginTop: 25,
        borderRadius:15,
        color: '#000000',
        borderColor: '#6E6060',
        borderWidth: 1, 
        textAlign: "center",
        height: 100,
        width: 300,
        backgroundColor: '#FFFFFF'
      },
    box0:{
        flex: 11
    },
    box:{
        flex: .5,
        marginBottom:15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: 200
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF'

    },
    textSelected:{
        marginTop: 20,
        marginBottom:25,
        marginLeft:10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C2C2C',
    },
    textActivity:{
        marginLeft: 5,
        marginTop: 35,
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonSignIn:{
      borderRadius:17,
      height: 40,
      width: 300,
      backgroundColor: '#5DC5E6',
      textAlign:'center',
      marginTop:7
    },
    touchableButtonSignIn:{
      justifyContent: 'center',
      marginBottom: 50,
      marginLeft:50,
      marginRight:50
    },
    registrate:{
      marginTop: 10,
      color: '#E7E7E7'
    }
  });

function mapStateToProps(state){
    return{
        student:state.videos.selectedStudent,
        activity:state.videos.selectedActivity,
        ipconfig: state.videos.selectedIPConfig
    }
}
export default connect(mapStateToProps)(selectMoment);