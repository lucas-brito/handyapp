import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import Picture from '../../components/Picture';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';

const styles = Theme.extend({
  picture: {
    width: 72,
    height: 72,
    borderRadius: 40,
    marginBottom: 12
  },
  centerItems: {
    alignItems: 'center'
  },
  labelView: {
    paddingTop: 14,
    paddingLeft: 6,
    paddingRight: 6,
  },
  labelText: {
    color: '#868e96'
  },
  inputItem: {
    flex: 1,
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
  buttonDisabled: {
    backgroundColor: '#E6E7E9'
  }
});

export default @inject('store') @observer
class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;
    const { fullname, email } = store.user;

    this.state = {
      fullname,
      email
    };

    store.drawer = {
      title: __('Profile'),
      navigation,
      type: 'back'
    };
  }

  saveChanges = (hasChanges) => {
    if (!hasChanges) {
      return !Alert.alert(
        __('There are no changes'),
        __('Make changes before saving your new account data'),
        [
          { text: __('Ok') },
        ]
      );
    }
    const { store } = this.props;
    const { fullname, email } = this.state;

    store.user.fullname = fullname;
    store.user.email = email;
  }

  onChange = (type, value) => {
    this.setState({ [type]: value });
  }

  render() {
    const { store } = this.props;
    const {
      created, picture
    } = store.user;
    const { fullname, email, focus } = this.state;

    let hasChanges;

    if (fullname !== store.user.fullname
      || email !== store.user.email) {
      hasChanges = true;
    }

    return (
      <View testID="UserProfile" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={[styles.sectionContainer, styles.centerItems]}>
            <TouchableOpacity>
              <Picture
                style={styles.picture}
                source={{ uri: picture }}
              />
            </TouchableOpacity>
            <Text style={[styles.text, { color: '#47525e' }]}>{__('Member since %s', moment(created).format('LL'))}</Text>
          </View>
          <View style={styles.sectionContainer}>
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
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonContainer, !hasChanges && styles.buttonDisabled]}
            onPress={() => this.saveChanges(hasChanges)}
          >
            <Text style={styles.buttonText}>{__('Save').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
