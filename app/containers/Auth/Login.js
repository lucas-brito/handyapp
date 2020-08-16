import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';

import TinyToast from '../../components/Toast';

import { __ } from '../../lib/I18n';
import { LocalStorage } from '../../lib/Store';
import Theme from '../../lib/Theme';

const styles = Theme.extend({
  labelView: {
    paddingTop: 14,
    paddingLeft: 6,
    paddingRight: 6,
  },
  labelText: {
    color: '#868e96'
  },
  inputItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    borderBottomWidth: Theme.hairlineWidth
  },
  textInputStyle: {
    color: '#212529'
  },
  inputFocus: {
    borderBottomColor: 'blue'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonContainer: {
    backgroundColor: '#343F4B',
    marginTop: 32
  },
  navBar: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderBottomColor: '#e9ecef',
    borderBottomWidth: 1
  }
});
export default @inject('store', 'api') @observer
class AuthLogin extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    this.state = {
      email: '',
      password: ''
    };

    store.drawer = {
      title: __('Login to handy'),
      navigation,
      type: 'back',
      invisible: true
    };
  }

  login = async () => {
    const { email, password } = this.state;
    const { api, store } = this.props;

    try {
      const user = await api.get('/authorize', { email, password });

      await LocalStorage.setItem('token', user.oauthProvider.access_token);

      api.accessToken = user.oauthProvider.access_token;
      store.user = user;
      store.accessToken = user.oauthProvider.access_token;
    } catch (e) {
      TinyToast.showError(__('Wrong email or password, please try again'));
    }
  }

  onChange = (type, value) => {
    this.setState({ [type]: value });
  }

  render() {
    const { email, password, focus } = this.state;

    return (
      <SafeAreaView testID="login" style={{ height: '100%' }}>
        <View style={styles.sectionContainer}>
          <View style={styles.labelView}>
            <Text style={styles.labelText}>{__('Email')}</Text>
            <TextInput
              onFocus={() => this.setState({ focus: 'email' })}
              onBlur={() => this.setState({ focus: null })}
              underlineColorAndroid="transparent"
              placeholderTextColor="#868e96"
              style={[styles.inputItem, styles.textInputStyle, focus === 'email' && styles.inputFocus]}
              value={email}
              onChangeText={(text) => this.onChange('email', text)}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCompleteType="name"
            />
          </View>
          <View style={styles.labelView}>
            <Text style={styles.labelText}>{__('Password')}</Text>
            <TextInput
              onFocus={() => this.setState({ focus: 'password' })}
              onBlur={() => this.setState({ focus: null })}
              underlineColorAndroid="transparent"
              placeholderTextColor="#868e96"
              style={[styles.inputItem, styles.textInputStyle, focus === 'password' && styles.inputFocus]}
              value={password}
              onChangeText={(text) => this.onChange('password', text)}
              textContentType="password"
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonContainer]}
            onPress={this.login}
          >
            <Text style={styles.buttonText}>{__('Login').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
