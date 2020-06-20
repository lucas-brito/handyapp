import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'mobx-react';

import { createStore } from './lib/Store';
import RootNavigation from './navigation/RootNavigation';
import { getLocaleContext} from './lib/I18n';

getLocaleContext();

const store = createStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <NavigationContainer>
          <>
            <RootNavigation context={() => this.context} />
          </>
        </NavigationContainer>
      </Provider>
    );
  }
}
