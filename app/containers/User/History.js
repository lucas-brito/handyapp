import React from 'react';
import {
  ScrollView,
  View,
  Text
} from 'react-native';
import { inject, observer } from 'mobx-react';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';

const styles = Theme.extend({
});

export default @inject('store') @observer
class UserHistory extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('History'),
      navigation,
      screen: 'history'
    };
  }

  render() {
    return (
      <View testID="UserHistory" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <Text>History</Text>
        </ScrollView>
      </View>
    );
  }
}
