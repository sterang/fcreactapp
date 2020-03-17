import React,{Component, Fragment} from 'react';
import Header from '../../components/header';
import SuggestionList from '../containers/doubtsList';
import { StyleSheet, Text, View ,Button} from 'react-native';
import API from '../../../utils/api';
import {connect} from 'react-redux';

class Home extends Component{
  static navigationOptions =({navigation})=>{
    return{
      header: <Header onPress={()=>navigation.openDrawer()}>Dudas</Header>,
    }
  }
    constructor(props){
        super(props);
        this.state ={
          loading:false,
          duda: [],
        }
      }
      async componentDidMount(){
          var data = {
              id_estudiante: this.props.student.id_estudiante
          }
        const duda = await API.allDoubtsStudents(this.props.ipconfig, data);
        this.props.dispatch({
          type:'SET_DOUBT_LIST',
          payload:{
            duda
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
      student:state.videos.selectedStudent,
      ipconfig: state.videos.selectedIPConfig
  }
}

export default connect(mapStateToProps) (Home);