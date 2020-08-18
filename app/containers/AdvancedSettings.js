import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { inject, observer } from 'mobx-react';

import TinyToast from '../components/Toast';

import { __ } from '../lib/I18n';
import Theme from '../lib/Theme';

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
});

export default @inject('store', 'api') @observer
class Settings extends React.Component {
  constructor(props) {
    super(props);

    const {
      store, navigation, route, api
    } = props;
    const { onClose } = route.params;

    store.drawer = {
      title: __('Advanced Settings'),
      type: 'back',
      onPress: () => {
        onClose();
        navigation.goBack();
      },
      invisible: true
    };

    this.state = {
      url: api.url
    };
  }

  updateSettings = () => {
    const { api, navigation, route, } = this.props;
    const { onClose } = route.params;
    const { url } = this.state;

    api.url = url;

    TinyToast.showSuccess(__('Settings changed successfully'));
    onClose();
    navigation.goBack();
  }

  onChange = (type, value) => {
    this.setState({ [type]: value });
  }

  render() {
    const { focus, url } = this.state;

    return (
      <SafeAreaView testID="AdvancedSettings" style={styles.container}>
        <View style={[styles.container, styles.sectionContainer, { justifyContent: 'space-between' }]}>
          <View style={styles.labelView}>
            <Text style={styles.labelText}>{__('Url')}</Text>
            <TextInput
              onFocus={() => this.setState({ focus: 'url' })}
              onBlur={() => this.setState({ focus: null })}
              underlineColorAndroid="transparent"
              placeholderTextColor="#868e96"
              style={[styles.inputItem, styles.textInputStyle, focus === 'url' && styles.inputFocus]}
              value={url}
              onChangeText={(text) => this.onChange('url', text)}
            />
          </View>

          <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={this.updateSettings}>
            <Text style={styles.buttonText}>
              {__('Submit').toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
