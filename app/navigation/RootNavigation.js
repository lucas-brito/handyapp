import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainStackNavigation from './MainStackNavigation';
import AuthStackNavigation from './AuthStackNavigation';

const Stack = createStackNavigator();

export default class RootNavigation extends React.Component {
  render() {
    const { store, context } = this.props;

    return (
      <Stack.Navigator
        initialRouteName={!!store?.accessToken ? 'Main' : 'Auth'}
      >
        {
          !!store?.accessToken && <Stack.Screen
            name="Main"
            component={MainStackNavigation}
            options={{ headerShown: false }}
          />
        }
        {
          !store?.accessToken && <Stack.Screen
            name="Auth"
            component={AuthStackNavigation}
            options={{ headerShown: false }}
          />
        }
      </Stack.Navigator>
    );
  }
}
