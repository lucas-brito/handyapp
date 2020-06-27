import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';

import NavBar from '../../components/NavBar';
import Icon from '../../components/Icon';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';

const orderByOptions = [
  { value: 'quality', name: __('Quality') },
  { value: 'price', name: __('Price') },
  { value: 'totalCount', name: __('Ratings count') },
  { value: 'fullname', name: __('Fullname') },
];

const distanceOptions = [
  { value: 5, name: __('less than %s Km', 5) },
  { value: 10, name: __('less than %s Km', 10) },
  { value: 20, name: __('less than %s Km', 20) }
];

const qualityOptions = [
  { value: 1, name: __('at least %s', 1) },
  { value: 2, name: __('at least %s', 2) },
  { value: 3, name: __('at least %s', 3) },
  { value: 4, name: __('at least %s', 4) },
  { value: 5, name: '5' }
];

const priceOptions = [
  { value: 1, name: __('at least %s', 1) },
  { value: 2, name: __('at least %s', 2) },
  { value: 3, name: __('at least %s', 3) },
  { value: 4, name: __('at least %s', 4) },
  { value: 5, name: '5' }
];

const totalCountOptions = [
  { value: 10, name: __('at least %s', 10) },
  { value: 50, name: __('at least %s', 50) },
  { value: 100, name: __('at least %s', 100) }
];

const filtersType = [
  {
    value: 'orderBy', options: orderByOptions, name: __('Order by'), icon: 'sort-amount-down'
  },
  {
    value: 'distance', options: distanceOptions, name: __('Distance'), icon: 'map-marked-alt'
  },
  {
    value: 'quality', options: qualityOptions, name: __('Quality'), icon: 'star'
  },
  {
    value: 'price', options: priceOptions, name: __('Price'), icon: 'dollar-sign'
  },
  {
    value: 'totalCount', options: totalCountOptions, name: __('Ratings count'), icon: 'poll'
  }
];

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
class ProviderFilter extends React.Component {
  constructor(props) {
    super(props);

    const { store, route } = props;
    const { filters } = route.params;

    store.drawer = null;

    this.state = {
      ...filters
    };
  }

  onCancel = () => {
    const { navigation, route } = this.props;
    const { onCancel } = route.params;

    onCancel();
    navigation.goBack();
  }

  submit = () => {
    const { navigation, route } = this.props;
    const { callback } = route.params;
    console.log(this.setState);
    callback(this.state);
    navigation.goBack();
  }

  clearFilter = () => {
    this.setState({
      quality: null,
      price: null,
      totalCount: null,
      orderBy: null,
      distance: null
    });
  }

  singleSelect = (type, value) => {
    const { [type]: currentValue } = this.state;
    const finalValue = currentValue === value ? null : value;

    this.setState({ [type]: finalValue });
  }

  render() {
    return (
      <SafeAreaView testID="ProviderFilter" style={[styles.container, { height: '100%' }]}>
        <NavBar
          left={(
            <TouchableOpacity
              style={styles.center}
              onPress={this.onCancel}
            >
              <Icon name="times" />
            </TouchableOpacity>
            )}
          center={(
            <View style={styles.center}>
              <Text style={styles.navBarTitle}>{__('Providers Filter')}</Text>
            </View>
        )}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          {
            filtersType.map((filter) => (
              <View key={filter.value} style={styles.sectionContainer}>
                <View style={styles.sectionTitle}>
                  <Icon name={filter.icon} size={16} color="#343F4B" />
                  <Text style={[styles.sectionTitleText, { marginLeft: 8 }]}>
                    {filter.name}
                  </Text>
                </View>
                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                  {
                    filter.options.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.button, styles.labelButton, this.state[filter.value] === option.value && styles.labelButtonSelected]}
                        onPress={() => this.singleSelect(filter.value, option.value)}
                      >
                        <Text style={this.state[filter.value] === option.value && styles.labelButtonTextSelected}>{option.name}</Text>
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View>
            ))
          }
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 24,
            borderTopColor: '#e9ecef',
            borderTopWidth: 1
          }}
        >
          <TouchableOpacity
            style={[styles.button, styles.roundedButton, { flex: 1, marginRight: 16, borderRadius: 6 }]}
            onPress={this.clearFilter}
            testID="ButtonClearFilters"
          >
            <Text style={[styles.buttonText, { fontWeight: 'normal', color: '#000' }]}>
              {__('Clear filters')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonContainer, { flex: 1, borderWidth: 0 }]}
            onPress={this.submit}
          >
            <Text style={styles.buttonText} testID="ButtonApplyFilters">
              {__('Apply filters')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
