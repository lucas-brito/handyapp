import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigation from './navigation/RootNavigation';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <>
          <RootNavigation context={() => this.context} />
        </>
      </NavigationContainer>
    );
  }
}
