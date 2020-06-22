import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import Home from '../../containers/Home';
import UserProfile from '../../containers/User/Profile';
import ProvidersList from '../../containers/Providers/List';

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
        <Stack.Screen
          name="UserProfile"
          component={withMappedNavigationParams()(UserProfile)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProvidersList"
          component={withMappedNavigationParams()(ProvidersList)}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}
