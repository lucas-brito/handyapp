import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { inject, observer } from 'mobx-react';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Picker } from '@react-native-community/picker';

import TinyToast from '../../components/Toast';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';
import { serviceCategories } from '../../lib/utils';
import { LocalStorage } from '../../lib/Store';

const defaultRadius = 20000;
const defaultLatitude = -22.81787;
const defaultLongitude = -47.06845;

const radiusOptions = () => [
  { label: __('%s Km', 10), value: 10000 },
  { label: __('%s Km', 20), value: 20000 },
  { label: __('%s Km', 30), value: 30000 },
  { label: __('%s Km', 40), value: 40000 },
  { label: __('%s Km', 50), value: 50000 }
];

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
    backgroundColor: '#343F4B'
  },
  screenContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between'
  },
  errorText: {
    color: '#b51515'
  },
  inputError: {
    borderBottomColor: '#b51515',
    color: '#b51515'
  },
  mapContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});
export default @inject('store', 'api') @observer
class AuthSignup extends React.Component {
  constructor(props) {
    super(props);

    const { store } = props;

    this.state = {
      provider: null,
      job: null,
      latitude: null,
      longitude: null,
      radius: null,
      email: '',
      fullname: '',
      username: '',
      password: '',
      confirmPassword: '',
      step: 0,
      errors: {}
    };

    store.drawer = {
      title: __('Sign up for handy'),
      type: 'back',
      onPress: this.goBack,
      invisible: true
    };
  }

  goBack = () => {
    const { step, provider } = this.state;

    if (!step) {
      const { navigation } = this.props;

      navigation.goBack();
    } else if (step === 1) {
      this.setState({ provider: null, step: 0 });
    } else if (step === 3 && provider) {
      this.setState({ step: 2 });
    } else if (step === 3) {
      this.setState({ step: 0 });
    } else {
      this.setState({ step: step - 1 });
    }
  }

  onSubmit = async () => {
    const {
      step,
      provider,
      job,
      latitude,
      longitude,
      radius,
      email,
      fullname,
      username,
      password
    } = this.state;

    if (step !== 4) {
      this.setState({ step: step + 1 });
    } else {
      const { api, store } = this.props;

      try {
        const params = {
          provider,
          job,
          email,
          fullname,
          username,
          password
        };

        if (provider) {
          params.latitude = latitude;
          params.longitude = longitude;
          params.radius = radius;
        }

        const user = await api.post('/users', params);

        await LocalStorage.setItem('token', user.oauthProvider.access_token);

        api.accessToken = user.oauthProvider.access_token;
        store.user = user;
        store.accessToken = user.oauthProvider.access_token;
      } catch (e) {
        TinyToast.showError(__('Something went wrong'));
      }
    }
  }

  onChange = (type, value) => {
    this.setState({ [type]: value });
  }

  renderTypeScreen = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.text, { textAlign: 'center' }]}>{__('Are you going to be a customer or a provider?')}</Text>
      <View style={styles.sectionContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={() => this.setState({ provider: false, step: 3 })}>
          <Text style={styles.buttonText}>{__('Customer').toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={() => this.setState({ provider: true, step: 1 })}>
          <Text style={styles.buttonText}>{__('Provider').toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  renderJobScreen = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.text, { textAlign: 'center' }]}>{__('What type of service you would like provide?')}</Text>
      <View style={styles.sectionContainer}>
        {
          serviceCategories().map((service) => (
            <TouchableOpacity key={service.category} style={[styles.button, styles.buttonContainer]} onPress={() => this.setState({ job: service.category, step: 2 })}>
              <Text style={styles.buttonText}>{service.name.toUpperCase()}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )

  changeMarkerCoordinate = ({ latitude, longitude }) => {
    this.setState({ latitude, longitude });
  }

  renderMapScreen = () => {
    const { latitude, longitude, radius } = this.state;
    const location = {
      latitude: latitude || defaultLatitude,
      longitude: longitude || defaultLongitude,
    };

    return (
      <View style={styles.container}>
        <View style={{ padding: 24 }}>
          <Text style={[styles.text, { textAlign: 'center', }]}>{__('Select location and range where you will provide your services')}</Text>
          <Picker
            selectedValue={radius || defaultRadius}
            style={{ height: Platform.OS === 'ios' ? 200 : 30, width: '100%' }}
            onValueChange={(itemValue) => this.setState({ radius: itemValue })}
            mode="dropdown"
          >
            {radiusOptions().map(({ label, value }) => <Picker.Item key={value} label={label} value={value} />)}
          </Picker>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              ...location,
              latitudeDelta: 0.6,
              longitudeDelta: 0.6,
            }}
            onRegionChange={this.changeMarkerCoordinate}
          >
            <Marker
              draggable
              coordinate={location}
            />
            <Circle
              center={location}
              radius={radius || defaultRadius}
              fillColor="#e04d5b61"
              strokeColor="#e04d5b"
            />
          </MapView>
        </View>
      </View>
    );
  }

  checkUsername = async () => {
    const { api } = this.props;
    const { username, errors } = this.state;

    api.get('/check-username', { username }).then((user) => {
      if (user) {
        this.setState({ errors: { ...errors, username: __('Already in use, choose another one') } });
      } else {
        this.setState({ errors: { ...errors, username: null } });
      }
    });
  }

  renderUserScreen = () => {
    const {
      focus, errors, email, username, fullname
    } = this.state;

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.labelView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.labelText}>{__('Username')}</Text>
            {errors.username && <Text style={styles.errorText}>{` ・ ${errors.username}`}</Text>}
          </View>
          <TextInput
            onFocus={() => this.setState({ focus: 'username' })}
            onBlur={() => this.setState({ focus: null }, this.checkUsername)}
            underlineColorAndroid="transparent"
            placeholderTextColor="#868e96"
            style={[styles.inputItem, styles.textInputStyle, errors.username && styles.inputError, focus === 'username' && styles.inputFocus]}
            value={username}
            onChangeText={(text) => this.onChange('username', text)}
          />
        </View>
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
          />
        </View>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>{__('Fullname')}</Text>
          <TextInput
            onFocus={() => this.setState({ focus: 'fullname' })}
            onBlur={() => this.setState({ focus: null })}
            underlineColorAndroid="transparent"
            placeholderTextColor="#868e96"
            style={[styles.inputItem, styles.textInputStyle, focus === 'fullname' && styles.inputFocus]}
            value={fullname}
            onChangeText={(text) => this.onChange('fullname', text)}
          />
        </View>
      </View>
    );
  }

  validatePassword = (type) => {
    const { errors, password, confirmPassword } = this.state;

    if (type === 'password') {
      const valid = password.length >= 4;

      if (!valid) {
        this.setState({ errors: { ...errors, password: __('Must have at least 4 characteres') } });
      } else {
        this.setState({ errors: { ...errors, password: null } });
      }
    } else {
      const valid = password === confirmPassword;

      if (!valid) {
        this.setState({ errors: { ...errors, confirmPassword: __('Must match password') } });
      } else {
        this.setState({ errors: { ...errors, confirmPassword: null } });
      }
    }
  }

  renderPasswordScreen = () => {
    const {
      focus, errors, password, confirmPassword
    } = this.state;

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.labelView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.labelText}>{__('Password')}</Text>
            {errors.password && <Text style={styles.errorText}>{` ・ ${errors.password}`}</Text>}
          </View>
          <TextInput
            onFocus={() => this.setState({ focus: 'password' })}
            onBlur={() => this.setState({ focus: null }, () => this.validatePassword('password'))}
            underlineColorAndroid="transparent"
            placeholderTextColor="#868e96"
            style={[styles.inputItem, errors.password && styles.inputError, styles.textInputStyle, focus === 'password' && styles.inputFocus]}
            value={password}
            onChangeText={(text) => this.onChange('password', text)}
            textContentType="password"
            secureTextEntry
          />
        </View>
        <View style={styles.labelView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.labelText}>{__('Confirm Password')}</Text>
            {errors.confirmPassword && <Text style={styles.errorText}>{` ・ ${errors.confirmPassword}`}</Text>}
          </View>
          <TextInput
            onFocus={() => this.setState({ focus: 'confirmPassword' })}
            onBlur={() => this.setState({ focus: null }, this.validatePassword)}
            underlineColorAndroid="transparent"
            placeholderTextColor="#868e96"
            style={[styles.inputItem, errors.confirmPassword && styles.inputError, styles.textInputStyle, focus === 'confirmPassword' && styles.inputFocus]}
            value={confirmPassword}
            onChangeText={(text) => this.onChange('confirmPassword', text)}
            textContentType="password"
            secureTextEntry
          />
        </View>
      </View>
    );
  }

  render() {
    const { step } = this.state;
    let view = this.renderTypeScreen();
    let button = null;

    if (step && step !== 1) {
      button = {
        text: __('Next')
      };
    }

    if (step === 1) {
      view = this.renderJobScreen();
    } else if (step === 2) {
      view = this.renderMapScreen();
      button.onPress = () => {
        const { latitude, longitude, radius } = this.state;
        const location = {
          latitude: latitude || defaultLatitude,
          longitude: longitude || defaultLongitude,
          radius: radius || defaultRadius
        };

        this.setState({ step: step + 1, ...location });
      };
    } else if (step === 3) {
      view = this.renderUserScreen();
    } else if (step === 4) {
      view = this.renderPasswordScreen();
      button = {
        text: __('Finish')
      };
    }

    return (
      <SafeAreaView testID="signup" style={styles.screenContainer}>
        {view}
        {
          button && (
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonContainer]}
                onPress={button.onPress || this.onSubmit}
              >
                <Text style={styles.buttonText}>{button.text.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </SafeAreaView>
    );
  }
}
