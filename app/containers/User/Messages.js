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

export default @inject('store', 'api') @observer
class UserMessages extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('Messages'),
      navigation,
      screen: 'messages'
    };

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const { api } = this.props;

    api.get('/conversations').then((data) => {
      this.setState({ messages: data });
    });
  }

  openMessageThread = (providerId, clientId) => {
    const { navigation } = this.props;

    navigation.navigate('MessageThread', {
      providerId,
      clientId
    });
  }

  renderMessageItem = ({
    id, created, provider, client, content, user_id: userId
  }) => {
    const { store } = this.props;
    const user = store.user.provider ? client : provider;
    const { picture, fullname } = user;

    return (
      <TouchableOpacity
        key={id}
        style={[styles.item, { borderBottomColor: 0, paddingBottom: 24 }]}
        onPress={() => this.openMessageThread(provider.id, client.id)}
      >
        <View style={{ width: 64 }}>
          <Picture
            style={styles.picture}
            source={{ uri: picture }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.fullname}>
            {fullname}
          </Text>
          <Text style={[styles.text, { paddingVertical: 12 }]}>
            {userId === store.user.id ? __('You: ') : __('%s: ', user.fullname)}
            {content.length > 90 ? `${content.substring(0, 90)}...` : content}
          </Text>
          <Text style={styles.text}>{__('On %s', moment(created).format('LL'))}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { messages } = this.state;
    const last30Days = messages.filter((message) => moment().diff(message.created, 'days') <= 30);
    const olderThan30Days = messages.filter((message) => moment().diff(message.created, 'days') > 30);

    return (
      <View testID="UserMessages" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View>
            <View>
              <Text style={styles.sectionTitle}>{__('Last 30 days')}</Text>
              <View>
                {last30Days.map((message) => this.renderMessageItem(message))}
                {
                  !last30Days.length && (
                    <View style={{
                      borderRadius: 4, backgroundColor: '#e2ecf7', marginTop: 8, paddingHorizontal: 24, paddingVertical: 12
                    }}
                    >
                      <Text style={{ fontSize: 12 }}>{__('You had no messages in the last 30 days')}</Text>
                    </View>
                  )
                }
              </View>
            </View>
            <View>
              <Text style={styles.sectionTitle}>{__('Older')}</Text>
              <View>
                {olderThan30Days.map((message) => this.renderMessageItem(message))}
                {
                  !olderThan30Days.length && (
                    <View style={{
                      borderRadius: 4, backgroundColor: '#e2ecf7', marginTop: 8, paddingHorizontal: 24, paddingVertical: 12
                    }}
                    >
                      <Text style={{ fontSize: 12 }}>{__('You had no messages before the last 30 days')}</Text>
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
