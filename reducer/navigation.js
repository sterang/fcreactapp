import {createNavigationReducer} from 'react-navigation-redux-helpers';
import AppNavigator from '../app/app-navigator';

const navigationReducer = createNavigationReducer(AppNavigator)
export default navigationReducer;
