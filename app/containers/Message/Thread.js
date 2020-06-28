import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import Icon from '../../components/Icon';

import { __ } from '../../lib/I18n';
import Theme from '../../lib/Theme';
import { getThread, getUser } from '../../lib/api';

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
  chatBubble: {
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  chatText: {
    color: '#000'
  }
});

export default @inject('store') @observer
class MessageThread extends React.Component {
  constructor(props) {
    super(props);

    const { route, store, navigation } = props;
    const user = getUser(store.user.type === 'provider' ? route.params.clientId : route.params.providerId);

    this.state = {
      messages: getThread(route.params.providerId, route.params.clientId)
    };

    store.drawer = {
      title: {
        text: user.fullname,
        picture: user.picture
      },
      navigation,
      type: 'back'
    };
  }

  renderMessageItem = ({
    id, created, content, userId
  }, previousMessage) => {
    const { store } = this.props;
    const messageOwner = userId === store.user.id;
    const chatItem = (
      <TouchableOpacity key={id} style={[styles.item, { borderBottomColor: 0 }]}>
        {messageOwner && <View style={{ flex: 1 }} />}
        <View style={[styles.chatBubble, { flex: 7, backgroundColor: messageOwner ? '#c0ccda' : '#e8eaec' }]}>
          <Text style={[styles.text, styles.chatText, { paddingBottom: 12 }]}>
            {content}
          </Text>
          <Text style={[styles.text, styles.chatText, { fontSize: 12 }]}>{moment(created).format('LL HH:mm')}</Text>
        </View>
        {!messageOwner && <View style={{ flex: 1 }} />}
      </TouchableOpacity>
    );

    let label = null;

    if (!previousMessage || !moment(created).isSame(previousMessage.created, 'day')) {
      if (!moment().diff(created, 'days')) {
        label = __('Today');
      } else if (moment().diff(created, 'days') === 1) {
        label = __('Yesterday');
      } else if (moment().diff(created, 'days') < 7) {
        label = moment(created).format('dddd');
      } else if (moment().isSame(created, 'year')) {
        label = moment(created).format('ddd, D MMM');
      } else {
        label = moment(created).format('ddd, D MMM, YYYY');
      }
    }

    return [
      !!label && (
        <View style={styles.center}>
          <View style={[styles.labelButton, { backgroundColor: '#343f4b' }]}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{label}</Text>
          </View>
        </View>
      ),
      chatItem
    ];
  }

  renderMessageForm = () => (
    <View style={{
      borderTopColor: '#e9ecef',
      borderTopWidth: 1,
      paddingHorizontal: 24,
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
    >
      <View>
        <Text style={styles.text}>
          {__('Write a message..')}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', width: 64, height: 32 }}>
        <TouchableOpacity style={[styles.center, {
          flex: 1
        }]}
        >
          <Icon name="paperclip" size={18} style={{ color: '#969faa' }} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.center, { flex: 1 }]}>
          <Icon name="paper-plane" size={18} style={{ color: '#969faa' }} />
        </TouchableOpacity>
      </View>
    </View>
  )

  render() {
    const { messages } = this.state;

    return (
      <View testID="MessageThread" style={styles.container}>
        <ScrollView
          ref={(c) => { this.messageList = c; }}
          onContentSizeChange={() => this.messageList.scrollToEnd({ animated: false })}
          contentInsetAdjustmentBehavior="automatic"
          style={{ marginTop: 12 }}
        >
          {messages.map((message, i) => this.renderMessageItem(message, messages[i - 1]))}
        </ScrollView>
        {this.renderMessageForm()}
      </View>
    );
  }
}
