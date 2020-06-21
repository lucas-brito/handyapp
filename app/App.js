import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'mobx-react';
import {
  View,
  Text
} from 'react-native';

import { createStore, LocalStorage } from './lib/Store';
import RootNavigation from './lib/navigation/RootNavigation';
import { getLocaleContext, __ } from './lib/I18n';

getLocaleContext();

const store = createStore();
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

    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;

    return (
      <Provider store={store}>
        <>
          {
          loaded
            ? (
              <NavigationContainer>
                <RootNavigation context={() => this.context} />
              </NavigationContainer>
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
