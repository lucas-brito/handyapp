import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';

import MainStackNavigation from './MainStackNavigation';
import AuthStackNavigation from './AuthStackNavigation';

const Stack = createStackNavigator();

export default @inject('store') @observer
class RootNavigation extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <Stack.Navigator
        initialRouteName={store.accessToken ? 'Main' : 'Auth'}
      >
        {
          !!store.accessToken && (
          <Stack.Screen
            name="Main"
            component={MainStackNavigation}
            options={{ headerShown: false }}
          />
          )
        }
        {
          !store.accessToken && (
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigation}
            options={{ headerShown: false }}
          />
          )
        }
      </Stack.Navigator>
    );
  }
}
