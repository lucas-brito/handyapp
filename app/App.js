import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'mobx-react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';

import Drawer from './components/Drawer';

import { createStore, LocalStorage } from './lib/Store';
import RootNavigation from './lib/navigation/RootNavigation';
import { getLocaleContext, __ } from './lib/I18n';
import { getActiveRouteName } from './lib/navigation/NavigationHelpers';
import { createAPI } from './lib/handyapi';

getLocaleContext();

const store = createStore();
const api = createAPI({ url: 'http://localhost:3000' });

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.loadLocalStorage();
  }

  loadLocalStorage = async () => {
    const stores = await LocalStorage.multiGet(['token']);

    const accessToken = stores[0][1];

    store.accessToken = accessToken;
    api.accessToken = accessToken;

    this.setState({ loaded: true });
  }

  onNavigationStateChange = (state) => {
    const previousRouteName = this.currentRouteName;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      // store.drawer = null;
    }

    // Save the current route name for later comparision
    this.currentRouteName = currentRouteName;
  }

  render() {
    const { loaded } = this.state;

    return (
      <Provider store={store} api={api}>
        <>
          <StatusBar barStyle="dark-content" />
          {
            loaded
              ? (
                <Drawer>
                  <NavigationContainer ref={(c) => { this.navigation = c; }} onStateChange={this.onNavigationStateChange}>
                    <RootNavigation context={() => this.context} />
                  </NavigationContainer>
                </Drawer>
              )
              : (
                <View testID="loading" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>
                    {__('Loading...')}
                  </Text>
                </View>
              )
          }
        </>
      </Provider>
    );
  }
}
