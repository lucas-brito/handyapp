import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import { inject, observer } from 'mobx-react';

import MainStackNavigation from './MainStackNavigation';
import AuthStackNavigation from './AuthStackNavigation';

import ProviderFilter from '../../containers/Provider/Filter';
import AdvancedSettings from '../../containers/AdvancedSettings';

export default @inject('store') @observer
class RootNavigation extends React.Component {
  render() {
    const { store } = this.props;

    const RootStack = createStackNavigator();

    return (
      <RootStack.Navigator
        mode="modal"
        initialRouteName={store.accessToken ? 'Main' : 'Auth'}
      >
        {
          !!store.accessToken && (
          <RootStack.Screen
            name="Main"
            component={MainStackNavigation}
            options={{ headerShown: false }}
          />
          )
        }
        {
          !store.accessToken && (
          <RootStack.Screen
            name="Auth"
            component={AuthStackNavigation}
            options={{ headerShown: false }}
          />
          )
        }
        <RootStack.Screen
          name="ProviderFilter"
          component={withMappedNavigationParams()(ProviderFilter)}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AdvancedSettings"
          component={withMappedNavigationParams()(AdvancedSettings)}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  }
}
