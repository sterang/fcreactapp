import React,{Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, Button, TextInput, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/headerReturn';
import { Ionicons , Octicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import {connect} from 'react-redux';
import API from '../../../utils/api';

const db = SQLite.openDatabase("db5.db");

class Configure extends Component {
  static navigationOptions =({navigation})=>{
    return{
      header: <Header onPress={()=>navigation.goBack()}>Actualiza Datos</Header>,
    }
  }
  state={
    id_student:null,
    grado:this.props.student.grado_estudiante,
    password: null,
    school: null,
    schoolSelected: this.props.student.id_colegio,
    name: this.props.student.nombre_estudiante,
    last_name: this.props.student.apellido_estudiante,
    user: this.props.student.nombre_usuario,
    email:this.props.student.correo_electronico,
    storage: null,
    students: null,
  }
  async componentDidMount(){
    console.log(this.props.student.grado_estudiante);
    var query2 = await API.loadSchool(this.props.ipconfig);
    var query = await API.allStudent(this.props.ipconfig);
    this.setState({ students: query })
    this.setState({ school: query2 })
  }
  async actualizaUser(){
    //update items set done = 1 where id = ?;
    data= {
      id_estudiante: this.props.student.id_estudiante,
      //tipo_usuario: 1,
      nombre_estudiante: this.state.name,
      apellido_estudiante: this.state.last_name,
      grado_estudiante: this.state.grado,
      curso_estudiante: 1,
      id_colegio: this.state.schoolSelected,
      nombre_usuario: this.state.user,
      contrasena: this.state.password,
      correo_electronico: this.state.email
    }
    var student = await API.updateStudents(this.props.ipconfig,data);
    console.log(student);
    db.transaction(
      tx => {
        //id_estudiante, tipo_usuario, nombre_estudiante, apellido_estudiante, grado_estudiante, curso_estudiante, id_colegio, nombre_usuario, contrasena, correo_electronico
        tx.executeSql("update students set nombre_estudiante = ? , apellido_estudiante = ?, grado_estudiante = ?,curso_estudiante = ?, id_colegio = ?, nombre_usuario = ?, contrasena = ?, correo_electronico = ? where id_estudiante = ? ", [this.state.name,this.state.last_name,this.state.grado, 1, this.state.schoolSelected, this.state.user, this.state.password, this.state.email, this.props.student.id_estudiante]);
        tx.executeSql("select * from students", [], (_, { rows: { _array } }) =>
          console.log(_array)
        );
      },
      null,
      null
    );
  }
  
    render() {      
      var datasSchoolFull = null;
        
      let itemsInPicker= null;
      //let itemsInPicker2= null;
      if(this.state.school==null){
        itemsInPicker = null;
      }else{
        console.log("Imprimiendo State");
        //console.log(datasSchool);
        datasSchoolFull = this.state.school;
        itemsInPicker = datasSchoolFull.map( data=> {
          return <Picker.Item label={data.nombre_colegio} key={data.id_colegio} value={data.id_colegio}/>
        })
      }
      //Agregando ItemPicker For Grados
      var dataGrado = [ 
        {
          id_grado:6,
          grado:"6"
        },
        {
          id_grado:7,
          grado:"7"
        },
        {
          id_grado:8,
          grado:"8"
        },
        {
          id_grado:9,
          grado:"9"
        },
        {
          id_grado:10,
          grado:"10"
        },
        {
          id_grado:11,
          grado:"11"
        },
      ];
      console.log(dataGrado);
      let itemsInPicker2 = dataGrado.map( data=> {
        return <Picker.Item label={data.grado} key={data.id_grado} value={data.id_grado}/>
      })

      return (
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.styleTextIni}>
              Actualiza Tus Datos
            </Text>
          </View>
          <View style={styles.containerTest}>
            <Text style={styles.textText} >Nombre: </Text>
            <TextInput style={styles.textData} value={this.state.name} onChangeText={(text) => this.setState({name: text})} ></TextInput>
          </View>
          <View style={styles.containerTest}>
            <Text style={styles.textText}>Apellido: </Text>
            <TextInput style={styles.textData} value={this.state.last_name} onChangeText={(text) => this.setState({last_name: text})}></TextInput>
          </View>

          <View style={styles.containerTest}>
                <Text style={styles.textText}>Grado: </Text>
                <Picker style={[styles.picker]} itemStyle={styles.pickerItem}
                selectedValue={this.state.grado}
                onValueChange={(itemValue, itemIndex) => this.setState({ grado: itemValue })}
                >   
                    {itemsInPicker2}
                </Picker>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Colegio: </Text>
                <Picker style={[styles.picker]} itemStyle={styles.pickerItem}
                selectedValue={this.state.schoolSelected}
                onValueChange={(itemValue, itemIndex) => this.setState({ schoolSelected : itemValue })}
                >
                    {itemsInPicker}
                </Picker>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Usuario: </Text>
                <TextInput style={styles.textData} value={this.state.user} onChangeText={(text) => this.setState({user: text})}></TextInput>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Correo: </Text>
                <TextInput style={styles.textData}  value={this.state.email} onChangeText={(text) => this.setState({email: text})}></TextInput>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Contraseña: </Text>
                <TextInput style={styles.textData} secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}></TextInput>
          </View>
          <View style={styles.containerText}>
          <Text style={[styles.textDocument, marginBottom=20]}>Recuerde que para registrarse necesita estar conectado con el servicio, en caso de no estar conectado dirijase a su director o al docente para que se le proporcione la conexión; tambien recuerde que en la aplicación puedes acceder a contenido adicional de manera de invitado. Al momento de Registrarse usted acepta los terminos de uso de datos para futuras investigaciones</Text>
          <TouchableOpacity style={[styles.touchableButtonSignIn, marginBottom=20,]} onPress={() => this.actualizaUser()}>
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
                            ACTUALIZA TUS DATOS
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    textDocument:{
      color: '#000',
      textAlign: 'justify',
      marginTop: 30,
      marginRight:15,
      marginLeft:15,
      marginBottom:20,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:10,
    },
    containerText:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerTest:{
      flex:1,
      flexDirection: 'row'
    },
    textText:{
      marginTop: 10,
      marginRight:0,
      marginLeft:10,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff',
      borderRadius: 16,
      alignItems: 'flex-start',
      width: 100,
      color: '#000000',
    },
    textData:{
      fontSize:14,
      marginTop: 5,
      color: '#FFFFFF',
      borderColor: '#6E6060',
      borderWidth: 1, 
      height: 40,
      width: 200,
      backgroundColor: '#4F4F4F'
    },
    styleTextIni:{
      marginBottom:15,
      fontSize: 16,
      color: '#4F4F4F',
      fontWeight:'bold',
    },
    picker: {
      marginTop: 5,
      width: 200,
      borderRadius:15,
      height: 40,
      color:'#FFFFFF',
      backgroundColor: '#4F4F4F',
      borderColor: '#6E6060',
      borderWidth:1,
    },    
    pickerItem: {
      borderRadius:15,
      height: 44,
      color: 'white'
    },
  });
  function mapStateToProps(state) {
    return {
      student: state.videos.selectedStudentAdmin,
      ipconfig: state.videos.selectedIPConfig
    }
  }
  export default connect(mapStateToProps)(Configure);