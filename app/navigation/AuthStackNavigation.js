import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import Landing from '../containers/Auth/Landing';

export default class AuthStackNavigation extends React.Component {

  render() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator
        initialRouteName="Landing"
      >
        <Stack.Screen
          name="Landing"
          component={withMappedNavigationParams()(Landing)}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}
