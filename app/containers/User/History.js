import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import Picture from '../../components/Picture';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';
import { getServices } from '../../lib/api';
import { serviceCategories } from '../../lib/utils';

const styles = Theme.extend({
  fullname: {
    fontSize: 16,
    color: '#1f2d3d'
  },
  picture: {
    width: 48,
    height: 48,
    borderRadius: 30
  },
  sectionTitle: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    color: '#1f2d3d',
    fontWeight: 'bold',
    marginBottom: 0
  }
});

export default @inject('store') @observer
class UserHistory extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('History'),
      navigation,
      screen: 'history'
    };

    this.state = {
      services: getServices(store.user.type === 'provider' ? 'providerId' : 'clientId', store.user.id)
    };
  }

  renderServiceItem = ({
    id, created, provider, client, category
  }) => {
    const { store } = this.props;
    const user = store.user.type === 'provider' ? client : provider;
    const { picture, fullname } = user;

    return (
      <TouchableOpacity key={id}>
        <View style={[styles.item, { borderBottomColor: 0, paddingBottom: 24 }]}>
          <View style={{ width: 64 }}>
            {
              picture && (
                <Picture
                  style={styles.picture}
                  source={{ uri: picture }}
                />
              )
            }
          </View>
          <View>
            <Text style={styles.fullname}>
              {fullname}
            </Text>
            <Text style={styles.text}>{serviceCategories().find((c) => c.category === category).name}</Text>
            <Text style={styles.text}>{__('On %s', moment(created).format('LL'))}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { services } = this.state;
    const last30Days = services.filter((service) => moment().diff(service.created, 'days') <= 30);
    const olderThan30Days = services.filter((service) => moment().diff(service.created, 'days') > 30);

    return (
      <View testID="UserHistory" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View>
            <View>
              <Text style={styles.sectionTitle}>{__('Last 30 days')}</Text>
              <View>
                {last30Days.map((service) => this.renderServiceItem(service))}
                {
                  !last30Days.length && (
                    <View style={{
                      borderRadius: 4, backgroundColor: '#e2ecf7', marginTop: 8, paddingHorizontal: 24, paddingVertical: 12
                    }}
                    >
                      <Text style={{ fontSize: 12 }}>{__('You had no services in the last 30 days')}</Text>
                    </View>
                  )
                }
              </View>
            </View>
            <View>
              <Text style={styles.sectionTitle}>{__('Older')}</Text>
              <View>
                {olderThan30Days.map((service) => this.renderServiceItem(service))}
                {
                  !olderThan30Days.length && (
                    <View style={{
                      borderRadius: 4, backgroundColor: '#e2ecf7', marginTop: 8, paddingHorizontal: 24, paddingVertical: 12
                    }}
                    >
                      <Text style={{ fontSize: 12 }}>{__('You had no services before the last 30 days')}</Text>
                    </View>
                  )
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
