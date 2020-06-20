import React from 'react';
import {
    View,
    Text
  } from 'react-native';

export default class AuthLanding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Auth Landing</Text>
      </View>
    );
  }
}
