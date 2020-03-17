import React,{Component} from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import API from './utils/api';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './store';
//import AppLayout from './app/app';
import ContenidoScreen from './app/screen/containers/contenido';
import AppNavigator from './app/app-navigator-with-state';
export default class App extends Component {
  render(){
  
  return (
    <Provider
    store={store}
    >
    <PersistGate
      loading={<Text>Cargando...</Text>}
      persistor={persistor}
    >
      <AppNavigator/>
    
    </PersistGate>
    </Provider>

  );
  

}
}
