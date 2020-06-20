import React from 'react';
import {
    View,
    Text,
    Button
  } from 'react-native';
import { inject, observer } from 'mobx-react';

import Icon from '../../components/Icon';

import { __ } from '../../lib/I18n';

export default @inject('store') @observer
class AuthLanding extends React.Component {
  render() {
    const { store } = this.props;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 8 }}>
              <Icon name={'comments'} />
            </View>
            <Text>{__('Auth Landing')}</Text>
          </View>
        <Button
          title={__('Login')}
          onPress={() => store.accessToken = 'Tem token'}
        />
      </View>
    );
  }
}
