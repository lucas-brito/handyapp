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
import { passwordAuthenticate } from '../../lib/api';

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
export default @inject('store') @observer
class AuthLanding extends React.Component {
  constructor(props) {
    super(props);

    const { store } = props;

    this.state = {
      email: '',
      password: ''
    };

    store.drawer = null;
  }

  login = async () => {
    const { email, password } = this.state;

    const user = passwordAuthenticate(email, password);

    if (!user) {
      TinyToast.showError(__('Wrong email or password, please try again'));
      return;
    }

    await LocalStorage.setItem('token', user.accessToken);

    const { store } = this.props;

    store.accessToken = user.accessToken;
  }

  onChange = (type, value) => {
    this.setState({ [type]: value });
  }

  render() {
    const { email, password, focus } = this.state;

    return (
      <SafeAreaView testID="landing" style={{ height: '100%' }}>
        <View style={styles.navBar}>
          <Text style={[styles.navBarTitle, { fontWeight: '500' }]}>{__('Login to handy')}</Text>
        </View>
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
