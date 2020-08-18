import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { inject, observer } from 'mobx-react';
import MapView, { Marker } from 'react-native-maps';

import { __ } from '../lib/I18n';
import Theme from '../lib/Theme';

const styles = Theme.extend({
  mapContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonContainer: {
    backgroundColor: '#343f4b'
  }
});

export default @inject('store') @observer
class Map extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('Select service location'),
      navigation,
      type: 'back'
    };

    this.state = {
      location: {
        latitude: -22.81787,
        longitude: -47.06845,
      }
    };
  }

  confirmServiceLocation = () => {
    const { navigation, route } = this.props;
    const { location } = this.state;

    navigation.navigate('ProviderList', {
      category: route.params.category,
      location
    });
  }

  changeMarkerCoordinate = ({ latitude, longitude }) => {
    this.setState({ location: { latitude, longitude } });
  }

  render() {
    const { location } = this.state;

    return (
      <View testID="Map" style={[styles.container, styles.mapContainer]}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={this.changeMarkerCoordinate}
        >
          <Marker
            draggable
            coordinate={location}
          />
        </MapView>
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity style={[styles.button, styles.buttonContainer]} onPress={this.confirmServiceLocation}>
            <Text style={styles.buttonText}>{__('Confirm location')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
