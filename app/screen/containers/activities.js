import React,{Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Header from '../../components/header';
import {connect} from 'react-redux';

import Reading from '../../components/reading';
class Activities extends Component {
  static navigationOptions =({navigation})=>{
    return{
      header: <Header onPress={()=>navigation.openDrawer()}>Mis Cursos</Header>,
    }
  }
  render() {
      return (
        <View style={styles.container}>
          <Text>Aqui estaran los Cursos!</Text>
          <Reading></Reading>
          <Text>Pulsame Para ir a about!</Text>
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
    },
  });
  export default connect(null) (Activities);