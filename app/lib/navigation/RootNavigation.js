import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

import { inject, observer } from 'mobx-react';
import { View, Text, Button } from 'react-native';

import MainStackNavigation from './MainStackNavigation';
import AuthStackNavigation from './AuthStackNavigation';

import ProvidersFilter from '../../containers/Providers/Filter';

export default @inject('store') @observer
class RootNavigation extends React.Component {
  render() {
    const { store } = this.props;

    const RootStack = createStackNavigator();
    const ModalScreen = ({ navigation, route }) => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button onPress={() => { console.warn(route); navigation.goBack(); }} title="Dismiss" />
      </View>
    );

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
          name="ProvidersFilter"
          component={withMappedNavigationParams()(ProvidersFilter)}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  }
}
