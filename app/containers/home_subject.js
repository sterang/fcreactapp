import React,{Component, Fragment} from 'react';
import Header from '../components/header';
import SuggestionList from '../containers/subject-list';
import { StyleSheet} from 'react-native';
import API from '../../utils/api';
import {connect} from 'react-redux';

class Home extends Component{
  static navigationOptions =({navigation})=>{
    return{
      header: <Header onPress={()=>navigation.openDrawer()}>Mis Cursos</Header>,
    }
  }
    constructor(props){
        super(props);
        this.state ={
          loading:false,
          subject: [],
        }
      }
      async componentDidMount(){
        console.log(this.props.ipconfig);
        console.log(this.props.student);
        const subject = await API.getCourses(this.props.ipconfig, this.props.student.grado_estudiante, this.props.student.id_colegio);
        this.props.dispatch({
          type:'SET_ACTIVITIES_LIST',
          payload:{
            subject
          }
        })
      }
    render(){
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
      ipconfig: state.videos.selectedIPConfig,
      student:state.videos.selectedStudent
  }
}

export default connect(mapStateToProps) (Home);