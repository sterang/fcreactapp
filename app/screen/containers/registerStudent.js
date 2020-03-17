import React,{Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, Button ,Image, TextInput, Picker,TouchableOpacity} from 'react-native';
import HeaderLogin from '../../components/headerLogin';
import { LinearGradient } from 'expo-linear-gradient';
import * as SQLite from 'expo-sqlite';
import API from '../../../utils/api';
import { Ionicons , Octicons } from '@expo/vector-icons';
import {connect} from 'react-redux';

const db = SQLite.openDatabase("db5.db");

class Register extends Component {
    static navigationOptions =({navigation})=>{
        return{
          header: <HeaderLogin></HeaderLogin>,
        }
      }
      state={
        id_student:null,
        grado:null,
        password: null,
        school: null,
        schoolSelected: null,
        name: null,
        last_name: null,
        user: null,
        email:null,
        storage: null,
        students: null,
      }
      async componentDidMount(){
        var query2 = await API.loadSchool(this.props.ipconfig);
        var query = await API.allStudent(this.props.ipconfig);
        this.setState({ students: query })
        console.log(query2[0].nombre_colegio);
        this.setState({ school: query2 })
        db.transaction(tx => {
          tx.executeSql(
            "create table if not exists students (id_estudiante integer not null unique, tipo_usuario integer, nombre_estudiante text, apellido_estudiante text, grado_estudiante int, curso_estudiante int, id_colegio int, nombre_usuario text, contrasena text, correo_electronico text);"
          );
          tx.executeSql("select * from students", [], (_, { rows:{ _array } }) =>
              this.setState({ storage: _array }),
              console.log(this.state.storage)
          );
      });

      }
      
      async Registrate(){
        console.log(this.state.grado);
        console.log(this.state.schoolSelected);
        var query2 = this.state.students;
        var query = await API.allStudent(this.props.ipconfig);
        console.log("Alumnos");
        console.log(query.length-1);
        var id_students_F = 0;
        if(query.length==0){
          id_students_F=1;
          this.setState({id_student: 1});
        }else{
          id_students_F=query.length+1;
          this.setState({id_student: query.length+1});
        }
        var id_final = "" + this.state.schoolSelected + id_students_F;
        id_final = parseInt(id_final);

        console.log("ID ESTUDIANTE");
        console.log(id_final);
        data= {
          id_estudiante: id_final,
          tipo_usuario: 1,
          nombre_estudiante: this.state.name,
          apellido_estudiante: this.state.last_name,
          grado_estudiante: this.state.grado,
          curso_estudiante: 1,
          id_colegio: this.state.schoolSelected,
          nombre_usuario: this.state.user,
          contrasena: this.state.password,
          correo_electronico: this.state.email
        }
        var student = await API.createStudents(this.props.ipconfig,data);
        console.log(student);
        db.transaction(
          tx => {
            tx.executeSql("insert into students (id_estudiante, tipo_usuario, nombre_estudiante, apellido_estudiante, grado_estudiante, curso_estudiante, id_colegio, nombre_usuario, contrasena, correo_electronico) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_final, 1,this.state.name,this.state.last_name,this.state.grado, 1, this.state.schoolSelected, this.state.user, this.state.password, this.state.email]);
            tx.executeSql("select * from students", [], (_, { rows: { _array } }) =>
              console.log(_array)
            );
          },
          null,
          null
        );
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'Notification'
      })) 
      }
      idEstudiante(){
        console.log(this.state.grado);
        console.log("EscuelaID");
        console.log(this.state.schoolSelected);
        var query = this.state.students;
        console.log("Alumnos");
        //console.log(query.length-1);
        var id_students_F = 0;
        if(query.length==0){
          id_students_F=1;
          this.setState({id_student: 1});
        }else{
          id_students_F=query.length+1;
          this.setState({id_student: query.length+1});
        }
        var id_final = "" + this.state.schoolSelected + id_students_F;
        id_final = parseInt(id_final);
        console.log(id_final);
        db.transaction(
          tx => {
            tx.executeSql(`delete from students where id_estudiante = ?;`, [1]);
          },
          null,
          null
        );
      }
      close(){
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'Notification'
        })) 
      }
      render() {
        
        var datasSchoolFull = null;
        
        let itemsInPicker= null;
        if(this.state.school==null){
          itemsInPicker = null;
        }else{
          console.log("Imprimiendo State");
          //console.log(datasSchool);
          datasSchoolFull = this.state.school;
          console.log(datasSchoolFull);
          itemsInPicker = datasSchoolFull.map( data=> {
            return <Picker.Item label={data.nombre_colegio} key={data.id_colegio} value={data.id_colegio}/>
          })
        }
        
      //console.log(this.props.navigation);
      return (
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              style={{ width: 60, height: 60 , marginLeft: 10 }}
              source={require('../../../assets/images/LogoSinFondo.png')}
            />
            <Text style={styles.textInit}>SMART FC</Text>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText} >Nombre: </Text>
                <TextInput style={styles.textData} onChangeText={(text) => this.setState({name: text})} ></TextInput>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Apellido: </Text>
                <TextInput style={styles.textData} onChangeText={(text) => this.setState({last_name: text})}></TextInput>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Grado: </Text>
                <Picker style={[styles.picker]} itemStyle={styles.pickerItem}
                selectedValue={this.state.grado}
                onValueChange={(itemValue, itemIndex) => this.setState({ grado: itemValue })}
                >
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7"/>
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11"/>
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
                <TextInput style={styles.textData} onChangeText={(text) => this.setState({user: text})}></TextInput>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Correo: </Text>
                <TextInput style={styles.textData}  onChangeText={(text) => this.setState({email: text})}></TextInput>
          </View>
          <View style={styles.containerTest}>
                <Text style={styles.textText}>Contraseña: </Text>
                <TextInput style={styles.textData} secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}></TextInput>
          </View>
          <Text style={styles.textDocument}>Recuerde que para registrarse necesita estar conectado con el servicio, en caso de no estar conectado dirijase a su director o al docente para que se le proporcione la conexión; tambien recuerde que en la aplicación puedes acceder a contenido adicional de manera de invitado. Al momento de Registrarse usted acepta los terminos de uso de datos para futuras investigaciones</Text>
          <View style={[styles.containerTest, marginBottom=50]}>
          <TouchableOpacity style={styles.touchableButtonSignIn} onPress={()=>this.Registrate()}>
            <LinearGradient
              colors={['#6CD492', '#5FCABB', '#5DC5E6']}
              style={{ padding: 10, alignItems: 'center', borderRadius: 18, height:40 }}>
              <Text
                style={{
                  backgroundColor: 'transparent',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#fff',
                  borderRadius: 16
                }}>
                REGISTRATE
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableButtonSignIn} onPress={()=>this.close()}>
            <LinearGradient
              colors={['#6CD492', '#5FCABB', '#5DC5E6']}
              style={{ padding: 10, alignItems: 'center', borderRadius: 18, height:40 }}>
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
      );
    }
  }
  const styles = StyleSheet.create({
    textDocument:{
      color: '#fff',
      textAlign: 'justify',
      marginTop: 30,
      marginRight:15,
      marginLeft:15,
      marginBottom:20,
    },
    containerLogo:{
      marginTop:30,
      flex:1,
      flexDirection: 'row',
      marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#424B5B',
    },
    containerTest:{
        flex:1,
        flexDirection: 'row'
    },
    textInit:{
        marginTop: 20,
        marginLeft: 30,
        fontSize: 20,
        fontWeight: "bold",
        color: '#E7E7E7'
    },
    textText:{
        marginTop: 10,
        marginRight:0,
        marginLeft:10,
        backgroundColor: 'transparent',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        borderRadius: 16,
        alignItems: 'flex-start',
        width: 100
    },
    textData:{
        marginTop: 5,
        borderRadius:15,
        color: '#000000',
        borderColor: '#6E6060',
        borderWidth: 1, 
        textAlign: "center",
        height: 40,
        width: 200,
        backgroundColor: '#FFFFFF'
      },
      picker: {
        marginTop: 5,
        width: 200,
        borderRadius:15,
        height: 40,
        color:'#000000',
        backgroundColor: '#FFFFFF',
        borderColor: '#6E6060',
        borderWidth:1,
      },    
      pickerItem: {
        borderRadius:15,
        height: 44,
        color: 'white'
      },
      touchableButtonSignIn:{
        marginLeft: 10,
        marginBottom: 15,
      },
  });
  function mapStateToProps(state){
    return{
        ipconfig: state.videos.selectedIPConfig
    }
  }
  export default connect(mapStateToProps) (Register);