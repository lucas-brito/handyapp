import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import Home from '../../containers/Home';

export default class MainStackNavigation extends React.Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={withMappedNavigationParams()(Home)}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}
