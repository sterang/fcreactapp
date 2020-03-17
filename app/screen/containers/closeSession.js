import React,{Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux';
class CloseSession extends Component {
    componentDidMount(){
      this.props.dispatch({
        type: 'SET_STUDENT',
        payload: {
          student: null,
        }
      })
      this.props.dispatch(NavigationActions.navigate({
        routeName: 'Login'
      }))
    }
    componentWillUpdate(){
      this.props.dispatch({
        type: 'SET_STUDENT',
        payload: {
          student: null,
        }
      })
      this.props.dispatch(NavigationActions.navigate({
        routeName: 'Login'
      }))
    }
    closeSesion(){
      this.props.dispatch({
        type: 'SET_STUDENT',
        payload: {
          student: null,
        }
      })
      this.props.dispatch(NavigationActions.navigate({
        routeName: 'Login'
      }))
    }
    render() {
      this.closeSesion();
      //console.log(this.props.navigation);
      return (
        <View style={styles.container}>
          <Text>Gracias por usar nuestros servicios, somos SMART FC</Text>
          <TouchableOpacity style={styles.touchableButtonSignIn} onPress={()=>this.closeSesion()}>
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
                VOLVER A LOGEARTE
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#424B5B',
    },
    touchableButtonSignIn:{
      marginLeft: 10,
      marginBottom: 15,
    },
  });
  export default connect(null) (CloseSession);