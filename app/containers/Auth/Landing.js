import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Icon from '../../components/Icon';

import { __ } from '../../lib/I18n';
import { LocalStorage } from '../../lib/Store';

export default @inject('store') @observer
class AuthLanding extends React.Component {
  login = async () => {
    const { store } = this.props;

    await LocalStorage.setItem('token', 'ABCDE');
    store.accessToken = 'ABCDE';
  }

  render() {
    return (
      <View testID="landing" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 8 }}>
            <Icon name="comments" />
          </View>
          <Text>{__('Auth Landing')}</Text>
        </View>
        <Button
          testID="login"
          title={__('Login')}
          onPress={this.login}
        />
      </View>
    );
  }
}
