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

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';
import { getProviders } from '../../lib/api';

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

export default @inject('store') @observer
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
      providers: getProviders(filters),
      loading: false
    };

    store.drawer = this.setDrawer(props);
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
    this.setState({ loading: true });

    const { store } = this.props;

    const providers = await getProviders(filters);
    store.drawer = this.setDrawer(this.props);

    this.setState({ loading: false, providers, filters });
  }

  onSelectProvider = (id) => {
    const { navigation } = this.props;
    const { filters } = this.state;

    navigation.navigate('ProviderNode', {
      id,
      category: filters.category
    });
  }

  render() {
    const { providers, loading } = this.state;

    if (loading) {
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
              <TouchableOpacity key={provider.id} onPress={() => this.onSelectProvider(provider.id)}>
                <View style={styles.item}>
                  <View style={{ width: 64 }}>
                    {
                    provider.picture && (
                      <Image
                        style={styles.picture}
                        source={{ uri: provider.picture }}
                      />
                    )
                  }
                  </View>
                  <View>
                    <Text style={styles.fullname}>
                      {provider.fullname}
                    </Text>
                    <Text style={styles.text}>{__('Quality: %s/5', provider.ratings.quality)}</Text>
                    <Text style={styles.text}>{__('Price: %s/5', provider.ratings.price)}</Text>
                    <Text style={styles.text}>{__('%s ratings', provider.ratings.totalCount)}</Text>
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
