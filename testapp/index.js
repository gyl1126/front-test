/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import "node-libs-react-native/globals";
//import './shim';

AppRegistry.registerComponent(appName, () => App);
