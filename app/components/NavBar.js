import React from 'react';
import {
  View, Text
} from 'react-native';

import Theme from '../lib/Theme';

const styles = Theme.extend({
  navContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between'
  }
});

export default class NavBar extends React.Component {
  render() {
    const { left, center, right } = this.props;

    return (
      <View style={{ height: 64 }}>
        <View style={[styles.container, styles.navContainer]}>
          <View style={{ width: 48 }}>
            {left}
          </View>
          <View style={[styles.container, styles.navContainer]}>
            <View>
              {center}
            </View>
            <View>
              {right}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
