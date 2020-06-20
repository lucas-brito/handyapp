import React from 'react';
import {
    View,
    Text,
    Button
  } from 'react-native';
  import { inject, observer } from 'mobx-react';

  @inject('store') @observer
export default class AuthLanding extends React.Component {
  render() {
    const { store } = this.props;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Auth Landing</Text>
        <Button
          title="Login"
          onPress={() => store.accessToken = 'Tem token'}
        />
      </View>
    );
  }
}
