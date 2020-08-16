import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Icon from '../components/Icon';

import { defaultStore, LocalStorage } from '../lib/Store';
import { __ } from '../lib/I18n';
import Theme from '../lib/Theme';

const styles = Theme.extend({
  title: {
    fontSize: 16,
    color: '#1F2D3D',
    marginBottom: 8
  }
});

export default @inject('store', 'api') @observer
class Settings extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('Settings'),
      navigation,
      type: 'back'
    };
  }

  logout = async () => {
    const { store, api } = this.props;

    Object.keys(store).forEach((i) => {
      if (store[i]) store[i] = defaultStore[i];
    });

    await LocalStorage.removeItem('token');
    api.accessToken = null;
  }

  onRedirect = (screen) => {
    const { navigation } = this.props;

    navigation.navigate(screen);
  }

  render() {
    return (
      <View testID="Settings" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <TouchableOpacity>
            <View style={[styles.item, { paddingHorizontal: 8 }]}>
              <View style={{ width: 48, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="bell" size={16} />
              </View>
              <View style={{ padding: 8 }}>
                <Text style={styles.title}>
                  {__('Notifications')}
                </Text>
                <Text style={styles.text}>{__('Manage push, email and more')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onRedirect('Help')}>
            <View style={[styles.item, { paddingHorizontal: 8 }]}>
              <View style={{ width: 48, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="question-circle" size={16} />
              </View>
              <View style={{ padding: 8 }}>
                <Text style={styles.title}>
                  {__('Help')}
                </Text>
                <Text style={styles.text}>{__('Having problems? We give you a handy')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={[styles.item, { paddingHorizontal: 8 }]}>
              <View style={{ width: 48, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="shield-alt" size={16} />
              </View>
              <View style={{ padding: 8 }}>
                <Text style={styles.title}>
                  {__('Security')}
                </Text>
                <Text style={styles.text}>{__('Check recent activity on handy')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={[styles.item, { paddingHorizontal: 8 }]}>
              <View style={{ width: 48, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="hand-spock" size={16} />
              </View>
              <View style={{ padding: 8 }}>
                <Text style={styles.title}>
                  {__('About handy')}
                </Text>
                <Text style={styles.text}>{__('Who we are')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.logout}>
            <View style={[styles.item, { paddingHorizontal: 8 }]}>
              <View style={{ width: 48, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="sign-out-alt" size={16} />
              </View>
              <View style={{ padding: 8 }}>
                <Text style={styles.title}>
                  {__('Logout')}
                </Text>
                <Text style={styles.text}>{__('Your account data will be stored')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
