import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import reducer from './reducer/index';
import { AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import AppNavigator from './app/app-navigator';
import { createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
//import {createNavigationReducer} from 'react-navigation-redux-helpers'
//const store = createStore(reducer,{
//    contenido:[],
//})
const persistConfig = 
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['navigation'],
  }
  const persistedReducer = persistReducer(persistConfig, reducer)

  const navigationMiddleware = createReactNavigationReduxMiddleware(
    state => state.navigation
  )
  
  const store = createStore(
    persistedReducer,
    applyMiddleware(navigationMiddleware)
  )
  const persistor = persistStore(store)
  
  export { store, persistor };