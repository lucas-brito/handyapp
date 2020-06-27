import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import { inject, observer } from 'mobx-react';

import { getUser } from '../api';

import Home from '../../containers/Home';
import Settings from '../../containers/Settings';
import UserProfile from '../../containers/User/Profile';
import UserMessages from '../../containers/User/Messages';
import UserHistory from '../../containers/User/History';
import ProviderList from '../../containers/Provider/List';
import ProviderNode from '../../containers/Provider/Node';

export default @inject('store') @observer
class MainStackNavigation extends React.Component {
  constructor(props) {
    super(props);

    const { store } = props;

    store.user = getUser(null, store.accessToken);
  }

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
          name="ProviderList"
          component={withMappedNavigationParams()(ProviderList)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProviderNode"
          component={withMappedNavigationParams()(ProviderNode)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={withMappedNavigationParams()(Settings)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMessages"
          component={withMappedNavigationParams()(UserMessages)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserHistory"
          component={withMappedNavigationParams()(UserHistory)}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}
