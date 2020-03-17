import React,{Component, Fragment} from 'react';
import SuggestionList from '../containers/activity-list';
import { StyleSheet} from 'react-native';
import API from '../../utils/api';
import {connect} from 'react-redux';
import HeaderReturn from '../components/headerReturn';
class Home extends Component{
  static navigationOptions =({navigation})=>{
    return{
      header: <HeaderReturn onPress={()=>navigation.goBack()}>Mis Actividades</HeaderReturn>,
    }

  }
    constructor(props){
        super(props);
        this.state ={
          loading:false,
          activity: [],
        }
      }
      async componentDidMount(){
        const activity = await API.getActivitiesMovil(this.props.ipconfig, this.props.student.id_colegio, this.props.student.grado_estudiante, this.props.subject.id_materia);
        console.log(activity);
        this.props.dispatch({
          type:'SET_SUBJECT_ACTIVITY_LIST',
          payload:{
            activity
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
      student:state.videos.selectedStudent,
      subject:state.videos.selectedSubjects
  }
}

export default connect(mapStateToProps) (Home);