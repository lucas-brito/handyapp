import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import Icon from '../../components/Icon';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';
import { getProvider, getRatings } from '../../lib/api';

const styles = Theme.extend({
  providerPicture: {
    width: 72,
    height: 72,
    borderRadius: 40,
    marginBottom: 12
  },
  centerItems: {
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonContainer: {
    backgroundColor: '#343F4B'
  },
  fullname: {
    color: '#1F2D3D'
  },
  clientPicture: {
    width: 36,
    height: 36,
    borderRadius: 30
  }
});

const serviceCategories = () => [
  { category: 'cleaning', name: __('Cleaning') },
  { category: 'gardening', name: __('Gardening') },
  { category: 'pumbling', name: __('Pumbling') },
  { category: 'electricity', name: __('Electricity') },
  { category: 'painting', name: __('Painting') },
];

export default @inject('store') @observer
class ProviderNode extends React.Component {
  constructor(props) {
    super(props);

    const { route, store, navigation } = props;

    this.state = {
      provider: getProvider(route.params.id),
      ratings: getRatings('providerId', route.params.id, route.params.category)
    };

    store.drawer = {
      title: __('Provider Profile'),
      navigation,
      type: 'back'
    };
  }

  renderEmptyRatings = () => (
    <View style={{
      borderRadius: 4, backgroundColor: '#e2ecf7', marginTop: 8, paddingHorizontal: 24, paddingVertical: 12
    }}
    >
      <Text style={{ fontSize: 12 }}>{__('This user was never rated for this type of work before, be the first to rate!')}</Text>
    </View>
  )

  renderRating = ({
    id, client, content, created, quality, price
  }) => (
    <View key={id} style={[styles.item, { paddingHorizontal: 0 }]}>
      <View style={{ width: 48 }}>
        {
          !!client.picture && (
            <Image
              style={styles.clientPicture}
              source={{ uri: client.picture }}
            />
          )
        }
      </View>
      <View style={{ flexShrink: 1 }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.fullname}>
            {client.fullname}
          </Text>
          <Text style={[styles.text, { fontSize: 10 }]}>
            {moment(created).format('DD/MM/YY')}
          </Text>
        </View>
        <View style={{
          width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4
        }}
        >
          <Text style={{ color: '#1F2D3D', fontSize: 10, fontWeight: 'bold' }}>
            {__('Quality: %s', quality)}
          </Text>
          <Text style={{ color: '#1F2D3D', fontSize: 10, fontWeight: 'bold' }}>
            {__('Price: %s', price)}
          </Text>
        </View>
        <View style={{ paddingTop: 8 }}>
          <Text style={[styles.text, { fontSize: 12, flexShrink: 1 }]}>
            {content}
          </Text>
        </View>
      </View>
    </View>
  )

  render() {
    const { provider, ratings } = this.state;
    const {
      fullname, created, picture
    } = provider;
    const { route } = this.props;

    return (
      <View testID="ProviderNode" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={[styles.sectionContainer, styles.centerItems]}>
            {
              picture && (
                <Image
                  style={styles.providerPicture}
                  source={{ uri: picture }}
                />
              )
            }
            <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold', color: '#47525e' }]}>{fullname}</Text>
            <Text style={[styles.text, { fontWeight: 'bold', color: '#47525e' }]}>{serviceCategories().find((category) => category.category === route.params.category).name}</Text>
            <Text style={[styles.text, { fontSize: 12, color: '#47525e' }]}>{__('Member since %s', moment(created).format('LL'))}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <View style={{ paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.text, { fontSize: 12, fontWeight: '500', color: '#47525e' }]}>{__('Service quality')}</Text>
              <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((rate) => <Icon key={rate} solid name="star" color={provider.ratings.quality >= rate ? '#ff9052' : '#969faa'} />)}
              </View>
            </View>
            <View style={{ paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.text, { fontSize: 12, fontWeight: '500', color: '#47525e' }]}>{__('Price accessibility')}</Text>
              <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((rate) => <Icon key={rate} solid name="star" color={provider.ratings.price >= rate ? '#ff9052' : '#969faa'} />)}
              </View>
            </View>
            <View style={{ paddingVertical: 4 }}>
              <Text style={[styles.text, { fontSize: 12, fontWeight: '500', color: '#47525e' }]}>{__('This user made %s services', Math.round(provider.ratings.totalCount * 1.2))}</Text>
            </View>
            <View style={{ paddingVertical: 4 }}>
              <Text style={[styles.text, { fontSize: 12, fontWeight: '500', color: '#47525e' }]}>{__('%s people rated this user', provider.ratings.totalCount)}</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonContainer, { marginBottom: 0 }]}>
              <Text style={styles.buttonText}>{__('Send me a message').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={[styles.text, { fontSize: 12, fontWeight: '500', color: '#47525e' }]}>{__('Ratings')}</Text>
            {
              !ratings.length
                ? this.renderEmptyRatings()
                : ratings.map((rating) => this.renderRating(rating))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}
