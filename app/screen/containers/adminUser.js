import React,{Component, Fragment} from 'react';
import Header from '../../components/header';
import SuggestionList from '../containers/adminUserList';
import { StyleSheet, Text, View ,Button} from 'react-native';
import API from '../../../utils/api';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
class Home extends Component{
  static navigationOptions =({navigation})=>{
    return{
      header: <Header onPress={()=>navigation.navigate('Login')}>Administación de Estudiantes</Header>,
    }
  }
  regresaHome(){
    this.props.dispatch(NavigationActions.navigate({
        routeName: 'Login'
      }))
  }
    constructor(props){
        super(props);
        this.state ={
          loading:false,
          students: [],
        }
      }
      async componentDidMount(){
        const students = await API.allStudent(this.props.ipconfig);
        this.props.dispatch({
          type:'SET_STUDENTS_LIST',
          payload:{
            students
          }
        })
      }
    render(){
      console.log("Prueba")
      //console.log(this.props.student);
        return(
            <Fragment>
                <SuggestionList></SuggestionList>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
  texto:{
    color:'white',
    fontSize: 17,
    fontWeight:"bold",
    marginLeft: 20,
  }
})
function mapStateToProps(state){
  return{
      ipconfig: state.videos.selectedIPConfig
  }
}

export default connect(mapStateToProps) (Home);