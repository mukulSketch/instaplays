/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
// import {store} from './src/redux/store';
import {store} from './src/redux-toolkit/store';

AppRegistry.registerComponent(appName, () => ReduxComp);

function ReduxComp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
