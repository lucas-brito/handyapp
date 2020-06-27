import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import Picture from '../components/Picture';
import Icon from '../components/Icon';

import { __ } from '../lib/I18n';
import Theme from '../lib/Theme';
import { getLastService } from '../lib/api';

const styles = Theme.extend({
  fullname: {
    fontSize: 16,
    color: '#1f2d3d',
    marginBottom: 8
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
  },
  cardContainer: {
    backgroundColor: '#e2ecf7',
    padding: 24,
    minHeight: 100,
    width: 240,
    borderRadius: 4,
    marginRight: 24
  }
});

// const frequentQuestions = () => [
//   __('Tenho problemas com outro serviço'),
//   __('Em que momento devo fazer o pagamento?'),
//   __('O prestador de serviço é confiável?'),
//   __('Não encontro o que preciso'),
//   __('Como faço pagar fazer o pagamento do serviço?'),
//   __('Eu fiz o pagamento mas ainda aparece como pendente'),
//   __('Quero me tornar um prestador de serviços'),
//   __('Outras perguntas')
// ];

const frequentQuestions = () => [
  __('Problems with another service'),
  __('When should I pay for the service?'),
  __('Is the service provider trustworthy'),
  __('Can\'t find what I need'),
  __('How do I pay for a service?'),
  __('I payed for a service but the status is still pending'),
  __('I want to become a service provider'),
  __('Other questions')
];

// const problemsCards = () => [
//   { icon: 'thumbs-down', content: __('Problema com a qualidade do serviço') },
//   { icon: 'heart-broken', content: __('O prestador não veio fazer o serviço') },
//   { icon: 'plus', content: __('Mais opções') },
// ];

const problemsCards = () => [
  { icon: 'thumbs-down', content: __('Problems with the service quality') },
  { icon: 'heart-broken', content: __('The service provider never showed up') },
  { icon: 'plus', content: __('More options') },
];

export default @inject('store') @observer
class Help extends React.Component {
  constructor(props) {
    super(props);

    const { store, navigation } = props;

    store.drawer = {
      title: __('Help'),
      navigation,
      type: 'back'
    };

    this.state = {
      lastService: getLastService(store.user.type === 'provider' ? 'providerId' : 'clientId', store.user.id)
    };
  }

  renderProblemCard = ({ icon, content }, key, lastItem) => (
    <TouchableOpacity key={key} style={[styles.cardContainer, lastItem && { marginRight: 0 }]}>
      <Icon name={icon} style={{ marginBottom: 12 }} />
      <Text style={{ fontSize: 16 }}>
        {content}
      </Text>
    </TouchableOpacity>
  )

  renderQuestionItem = (question, key) => (
    <TouchableOpacity key={key} style={[styles.item, { borderBottomColor: 0, paddingBottom: 24 }]}>
      <View style={{ flex: 7, paddingBottom: 12 }}>
        <Text style={styles.fullname}>
          {question}
        </Text>
      </View>
      <View style={[styles.center, { flex: 1, alignItems: 'flex-end' }]}>
        <Icon name="arrow-right" size={16} />
      </View>
    </TouchableOpacity>
  )

  render() {
    const { store } = this.props;
    const { lastService } = this.state;
    const { created, provider, client } = lastService;

    const user = store.user.type === 'provider' ? client : provider;
    const { picture, fullname } = user;

    return (
      <View testID="Help" style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View>
            <Text style={styles.sectionTitle}>{__('Your last service')}</Text>
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
                <Text style={styles.text}>{__('On %s', moment(created).format('LL'))}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.sectionTitle}>{__('Problems with this service')}</Text>
            <View style={[styles.item, { borderBottomColor: 0, paddingBottom: 24 }]}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                {problemsCards().map((problem, i) => this.renderProblemCard(problem, i, (i + 1) === problemsCards().length))}
              </ScrollView>
            </View>
          </View>
          <View>
            <Text style={styles.sectionTitle}>{__('Frequent questions')}</Text>
            {frequentQuestions().map((question, i) => this.renderQuestionItem(question, i))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
