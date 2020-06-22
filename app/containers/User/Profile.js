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
class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('User Profile'),
      type: 'back',
      navigation
    };
  }

  render() {
    const { navigation } = this.props;

    return (
      <View testID="UserProfile" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 8 }}>
            <Icon name="user" />
          </View>
          <Text>{__('User Profile')}</Text>
        </View>
        <Button
          title="Go to User Home"
          onPress={() => { navigation.navigate('Home'); }}
        />
      </View>
    );
  }
}
