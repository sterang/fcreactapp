import React,{Component} from 'react';
import ContenidoLayout from '../components/detailActivity';
import { StyleSheet,Button} from 'react-native';
import Close from '../../components/close';
import Details from '../../components/detailActivity';
import {Animated} from 'react-native';
import {connect} from 'react-redux';
import Player from '../../containers/player-activity';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
//import Audio from '../../containers/audio-activity';
import Audio from '../../containers/audio-activity';
import {NavigationActions} from 'react-navigation';
import Reader from '../../containers/reader-activity';
import HeaderReturn from '../../components/headerReturn';

class playContent extends Component{
    state={
        opacity:new Animated.Value(0),
    }
    static navigationOptions=({navigation})=>{
        return{
            header: (<HeaderReturn onPress={()=>navigation.goBack()}>Visualiza tu contenido</HeaderReturn>)
        }
    }
    componentDidMount(){
        Animated.timing(
            this.state.opacity,{
                toValue:1,
                duration:1000,
            }
        ).start();
    }
    continuarContenido(){
        this.props.dispatch({
            type:'SET_SELECT_ACTIVITIES_SUBJECT_LIST',
            payload:{
                activity: this.props.activity,
             }
        })
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'TestActivity'
        }))
    }
    render(){
        console.log("Abriendo PlayContents")
        console.log(this.props.activity.video);
        if (this.props.activity.video=='1'){
        return(
            <Animated.View
                style={{flex:1, opacity:this.state.opacity, }}
            >
                <ContenidoLayout>
                    <Player {...this.props.activity}/>
                </ContenidoLayout>
                
            </Animated.View>
        );
        }else if(this.props.activity.documento=='1'){
            return(
                <Animated.View
                style={{flex:1, opacity:this.state.opacity, }}
            >
                <ContenidoLayout>
                    <Reader {...this.props.activity}/>
                </ContenidoLayout>
                <Button title="Continua Aprendiendo" onPress={()=>this.continuarContenido()}/>
            </Animated.View>
            );
        }else if(this.props.activity.audio=='1'){
            return(
                <Animated.View
                style={{flex:1, opacity:this.state.opacity, }}
            >
                <ContenidoLayout>
                    <Audio {...this.props.activity}/>
                </ContenidoLayout>
                <Button title="Continua Aprendiendo" onPress={()=>this.continuarContenido()}/>
            </Animated.View>
            );
        }
        else{
            return(
                <Button title="Regresa" onPress={()=>this.continuarContenido()}/>
            );
        }

    }
}
function mapStateToProps(state){
    return{
        activity:state.videos.selectedActivity, 
    }
}
export default connect(mapStateToProps)(playContent);