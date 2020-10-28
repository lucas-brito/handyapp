import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import Icon from '../../components/Icon';

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

export default @inject('store', 'api') @observer
class MessageThread extends React.Component {
  constructor(props) {
    super(props);

    const { route, store, navigation } = props;

    this.state = {
      messages: [],
      clientId: store.user.provider ? route.params.clientId : store.user.id,
      providerId: store.user.provider ? store.user.id : route.params.providerId,
      user: null,
      content: '',
      loading: false
    };

    store.drawer = {
      title: {
        text: null,
        picture: null
      },
      navigation,
      type: 'back'
    };
  }

  componentDidMount() {
    const { api, route, store } = this.props;
    const { clientId, providerId } = this.state;
    const userId = store.user.provider ? route.params.clientId : route.params.providerId;

    api.get(`/users/${userId}`).then((data) => {
      this.setState({ user: data }, this.setDrawer);
    });

    const params = {
      client_id: clientId,
      provider_id: providerId
    };

    api.get('/conversation', params).then((data) => {
      this.setState({ messages: data });
    });
  }

  setDrawer = () => {
    const { navigation, store } = this.props;
    const { user } = this.state;

    store.drawer = {
      title: {
        text: user?.fullname || '',
        picture: user?.picture
      },
      navigation,
      type: 'back'
    };
  }

  renderMessageItem = ({
    id, created, content, user_id: userId
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
          <Text style={[styles.text, styles.chatText, { fontSize: 12 }]}>{moment(created).format('HH:mm')}</Text>
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
        <View style={styles.center} key={label}>
          <View style={[styles.labelButton, { backgroundColor: '#343f4b' }]}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{label}</Text>
          </View>
        </View>
      ),
      chatItem
    ];
  }

  onSubmitReply = () => {
    this.setState({ loading: true });

    const { api } = this.props;
    const {
      clientId, providerId, content, messages
    } = this.state;

    const params = {
      client_id: clientId,
      provider_id: providerId,
      content
    };

    api.post('/messages', params).then((data) => {
      messages.push(data);
      this.setState({ messages, content: '', loading: false });
    }).catch((e) => this.setState({ loading: false }));
  }

  renderMessageForm = () => {
    const { content, loading } = this.state;

    return (
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
        <View style={{ flex: 1 }}>
          <TextInput
            multiline
            autoGrow
            maxHeight={80}
            style={styles.text}
            value={content}
            placeholder={__('Write a message..')}
            onChangeText={(text) => this.setState({ content: text })}
          />
        </View>
        <View style={{ flexDirection: 'row', width: 64, height: 32 }}>
          <TouchableOpacity style={[styles.center, {
            flex: 1
          }]}
          >
            <Icon name="paperclip" size={18} style={{ color: '#969faa' }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.center, { flex: 1 }]} onPress={this.onSubmitReply} disabled={loading || !content}>
            <Icon name="paper-plane" size={18} style={{ color: content ? '#343f4b' : '#969faa' }} solid={!!content} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { messages } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={108}
      >
        <SafeAreaView testID="MessageThread" style={styles.container}>
          <ScrollView
            ref={(c) => { this.messageList = c; }}
            onContentSizeChange={() => this.messageList.scrollToEnd({ animated: false })}
            contentInsetAdjustmentBehavior="automatic"
          >
            <View style={{ height: 12 }} />
            {messages.map((message, i) => this.renderMessageItem(message, messages[i - 1]))}
          </ScrollView>
          {this.renderMessageForm()}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
