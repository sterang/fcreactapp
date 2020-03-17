import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppNavigator from './app-navigator';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import { BackHandler} from 'react-native';

const ReduxifyApp = createReduxContainer(AppNavigator);

class AppNavigatorWithState extends ReduxifyApp {
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    handleBackPress = () => {
      console.log("Entra en el Handle")
      this.goBack(); // works best when the goBack is async
      return true;
    }
    onBackPress = () => {
      // cuando le piques al back de android
      
      this.props.dispatch(
        NavigationActions.back({
          key: null
        })
      )
      return true
    }
  }
  
  function mapStateToProps(state) {
    return {
      state: state.navigation
    }
  }
  export default connect(mapStateToProps)(AppNavigatorWithState)