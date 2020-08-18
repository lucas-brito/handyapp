import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Icon from '../../components/Icon';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';

const styles = Theme.extend({
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonContainer: {
    backgroundColor: '#343f4b'
  },
  screenContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between'
  },
  navBar: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderBottomColor: '#e9ecef',
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 64
  }
});
export default @inject('store', 'api') @observer
class AuthLanding extends React.Component {
  constructor(props) {
    super(props);

    const { store } = props;

    store.drawer = null;
  }

  selectFlow = (screen) => {
    const { navigation } = this.props;

    navigation.navigate(screen);
  }

  openAdvancedSettings = () => {
    const { navigation, store } = this.props;

    navigation.navigate('AdvancedSettings', {
      onClose: () => {
        store.drawer = null;
      }
    });
  }

  render() {
    return (
      <SafeAreaView testID="landing" style={styles.screenContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={this.openAdvancedSettings}
          >
            <Icon name="ellipsis-v" size={16} />
          </TouchableOpacity>
        </View>
        <View style={[styles.sectionContainer, { alignSelf: 'center' }]}>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{__('Welcome to Handy!')}</Text>
        </View>
        <View style={[styles.sectionContainer, { alignSelf: 'center' }]}>
          <Icon name="hand-spock" size={64} style={{ color: '#343f4b' }} />
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={() => this.selectFlow('Login')}>
            <Text style={styles.buttonText}>{__('Login').toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={() => this.selectFlow('Signup')}>
            <Text style={styles.buttonText}>{__('Signup').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
