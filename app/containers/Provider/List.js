import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Icon from '../../components/Icon';
import Picture from '../../components/Picture';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';

const styles = Theme.extend({
  fullname: {
    fontSize: 16,
    color: '#1F2D3D',
    marginBottom: 8
  },
  picture: {
    width: 48,
    height: 48,
    borderRadius: 30
  }
});

export default @inject('store', 'api') @observer
class ProviderList extends React.Component {
  constructor(props) {
    super(props);

    const { route, store } = props;

    const filters = {
      category: route.params.category,
      search: '',
      quality: null,
      price: null,
      totalCount: null,
      orderBy: null,
      distance: null
    };

    this.state = {
      filters,
      providers: null,
      loading: true
    };

    store.drawer = this.setDrawer(props);
  }

  componentDidMount() {
    const { filters } = this.state;
    const { api, route } = this.props;
    const params = {
      job: filters.category,
      radius: filters.distance,
      ...route.params.location
    };

    api.get('/users', params).then((data) => {
      this.setState({ providers: data, loading: false });
    });
  }

  setDrawer = (props) => {
    const { navigation } = props;

    return {
      title: __('Found service providers'),
      navigation,
      type: 'back',
      right: (
        <TouchableOpacity
          style={styles.center}
          onPress={this.openFilter}
        >
          <Icon name="filter" />
        </TouchableOpacity>
      )
    };
  }

  openFilter = () => {
    const { navigation, store } = this.props;
    const { filters } = this.state;

    navigation.navigate('ProviderFilter', {
      filters,
      onCancel: () => {
        store.drawer = this.setDrawer(this.props);
      },
      callback: (f) => {
        this.filterProviders(f);
      }
    });
  }

  filterProviders = async (filters) => {
    const { store, api, route } = this.props;

    store.drawer = this.setDrawer(this.props);

    this.setState({ loading: true });

    const params = {
      job: filters.category,
      radius: filters.distance,
      ...route.params.location
    };

    api.get('/users', params).then((data) => {
      this.setState({ filters, providers: data, loading: false });
    });
  }

  onSelectProvider = (provider) => {
    const { navigation } = this.props;
    const { filters } = this.state;

    navigation.navigate('ProviderNode', {
      id: provider.id,
      provider,
      category: filters.category
    });
  }

  render() {
    const { providers, loading } = this.state;

    if (loading && !providers) {
      return (
        <View testID="ProviderList" style={styles.container}>
          <Text>{__('Loading...')}</Text>
        </View>
      );
    }

    return (
      <View testID="ProviderList" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          {
            providers.map((provider) => (
              <TouchableOpacity key={provider.id} onPress={() => this.onSelectProvider(provider)}>
                <View style={styles.item}>
                  <View style={{ width: 64 }}>
                    <Picture
                      style={styles.picture}
                      source={{ uri: provider.picture }}
                    />
                  </View>
                  <View>
                    <Text style={styles.fullname}>
                      {provider.fullname}
                    </Text>
                    <Text style={styles.text}>{__('Quality: %s/5', provider.ratings?.quality || '--')}</Text>
                    <Text style={styles.text}>{__('Price: %s/5', provider.ratings?.price || '--')}</Text>
                    <Text style={styles.text}>{__('%s ratings', provider.ratings?.totalCount || 0)}</Text>
                  </View>
                </View>
              </TouchableOpacity>

            ))
          }
        </ScrollView>
      </View>
    );
  }
}
