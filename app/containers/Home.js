import React from 'react';
import {
  ScrollView,
  View,
  Text
} from 'react-native';
import { inject, observer } from 'mobx-react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { LocalStorage } from '../lib/Store';
import { __ } from '../lib/I18n';
import Theme from '../lib/Theme';

const styles = Theme.extend({
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonContainer: {
    backgroundColor: '#343F4B'
  }
});

export default @inject('store') @observer
class Home extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('Home'),
      navigation
    };
  }

  logout = async () => {
    const { store } = this.props;

    await LocalStorage.removeItem('token');
    store.accessToken = null;
  }

  selectServiceCategory = (category) => {
    const { navigation } = this.props;

    navigation.navigate('ProvidersList', {
      category
    });
  }

  render() {
    const serviceCategories = [
      { category: 'cleaning', name: __('Cleaning') },
      { category: 'gardening', name: __('Gardening') },
      { category: 'pumbling', name: __('Pumbling') },
      { category: 'electricity', name: __('Electricity') },
      { category: 'painting', name: __('Painting') },
    ];

    return (
      <View testID="Home" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.sectionContainer}>
            <Text style={styles.text}>Select the type of service you would like to search for. Then select the location where the service will be performed</Text>
          </View>
          <View style={styles.sectionContainer}>
            {
              serviceCategories.map((service) => (
                <TouchableOpacity key={service.category} style={[styles.button, styles.buttonContainer]} onPress={() => this.selectServiceCategory(service.category)}>
                  <Text style={styles.buttonText}>{service.name.toUpperCase()}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}
