import React,{Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './screen/containers/login';
import Configure from './screen/containers/configure';
import Home from './containers/home';
import Registro from './screen/containers/registerStudent';
import contenido from './screen/containers/contenido';
import Activity from './containers/home_subject';
import ActivitySubj from './containers/home_activity';
import DetailActivitySubj from './screen/containers/detailActivity';
import PlayContent from './screen/containers/playContent';
import TestActivity from './screen/containers/testActivity';
import SelectMoment from './screen/containers/selectMoment';
import PlayExcersise from './screen/containers/playExcercise';
import Doubts from './screen/containers/doubtsActivity';
import updateData from './screen/containers/configureUserAdmin';
import adminUserData from './screen/containers/adminUser';
import EvaluationActivity from './screen/containers/evaluationActivity';
import CloseSession from './screen/containers/closeSession';
import Profile from './screen/containers/Profile'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons , Octicons } from '@expo/vector-icons';
import {BackHandler} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

function goodBye(){
    BackHandler.exitApp();
}
const Main = createStackNavigator(
    {
        Home:
        {
            screen: Home
        },
        Contenido: 
        {
            screen:contenido
        },
        Activity:{
            screen:Activity,
        },
    },
    {
        defaultNavigationOptions:{
            initialRouteName:'Home',
            gesturesEnabled: true,
        }
    }
)
const Profiles = createStackNavigator(
    {
        Profile: Profile,
    },
    {
        initialRouteName: 'Profile',
    }
)
const Activities = createStackNavigator(
    {
        Activity: Activity,
        ActivitySubj: ActivitySubj,
        DetailActivitySubj: DetailActivitySubj,
        PlayContent: PlayContent,
        TestActivity: TestActivity,
        SelectMoment: SelectMoment,
        PlayExcersise: PlayExcersise,
        EvaluationActivity: EvaluationActivity
    },
    {
        initialRouteName: 'Activity',
    }
)
const Notifications = createStackNavigator(
    {
        Notification: Login,
        Registro: Registro
    },
    {
        initialRouteName: 'Notification',
    }
)
const Configuration = createStackNavigator(
    {
        Configuracion: Configure
    },
    {
        initialRouteName: 'Configuracion',
    }
)
const DoubtsActivity = createStackNavigator(
    {
        DoubtsActivity: Doubts
    },
    {
        initialRouteName: 'DoubtsActivity',
    }
)
const AdminUSer = createStackNavigator(
    {
        AdminUSer: adminUserData,
        ConfigureAdmin: updateData
    },
    {
        initialRouteName: 'AdminUSer',
    }
)

const DrawerNavigator = createDrawerNavigator(
    {
        Profile:{
            screen:Profiles,
            navigationOptions:{
                title:'Perfil',
                drawerIcon: <Ionicons name="md-contact" size={28} color="white"/>
            }
        },
        Activities: {
            screen:Activities,
            navigationOptions:{
                title:'Mis Cursos',
                drawerIcon: <Ionicons name="md-bookmarks" size={28} color="white"/>
            }
        },
        Home: {
            screen: Main,
            navigationOptions:{
                title:'Contenido REA',
                drawerIcon: <Ionicons name="md-browsers" size={28} color="white"/>
            }
        },
        
        Configuracion:{
            screen:Configuration,
            navigationOptions:{
                title:'Configuracion',
                drawerIcon: <Ionicons name="md-settings" size={28} color="white"/>
            }
        },
        DudasCenter:{
            screen:DoubtsActivity,
            navigationOptions:{
                title:'Dudas Actividad',
                drawerIcon: <Ionicons name="md-information-circle" size={28} color="white"/>
            }
        },
        
        Login:{
            screen:goodBye,
            navigationOptions:{
                title:'Cerrar Sesion',
                drawerIcon: <Ionicons name="md-information-circle" size={28} color="white"/>
            }
        },
        
    },
    {
        initialRouteName:'Login',
        drawerWidth:200,
        drawerBackgroundColor:'#272D34',
        contentOptions:{
            activeTintColor :'#ffffff',
            inactiveTintColor :'white',
            activeBackgroundColor :'#1A1E23',
            itemStyle:{
                borderBottomWidth: 1,
                borderBottomColor: '#5C6167',
            }
        },
        
    }
)
const SwitchNavigator = createSwitchNavigator(
    {
        Login:Notifications,
        Admin: AdminUSer,
        DrawerNavigator:DrawerNavigator,
        
    },
    {
      initialRouteName: 'Login',
    }
)
export default createAppContainer(SwitchNavigator);