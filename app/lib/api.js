import _, { filter } from 'lodash';
import {
  users, ratings, services, messages
} from './TestStorage';

const getProviders = ({
  category, search, quality, price, totalCount, orderBy, distance
}) => {
  let orderByIteratee = null;
  let orderByOrder = null;

  let filteredUsers = users
    .filter((user) => user.type === 'provider')
    .filter((user) => !category || user.categories.includes(category))
    .filter((user) => !search || user.fullname.indexOf(search) > -1)
    .filter((user) => !quality || user.ratings.quality >= quality)
    .filter((user) => !price || user.ratings.price >= price)
    .filter((user) => !totalCount || user.ratings.totalCount >= totalCount);

  if (['fullname'].includes(orderBy)) {
    orderByIteratee = orderBy;
    orderByOrder = 'asc';
  } else if (['price', 'quality', 'totalCount'].includes(orderBy)) {
    orderByIteratee = `ratings.${orderBy}`;
    orderByOrder = 'desc';
  }

  if (orderByIteratee) filteredUsers = _.orderBy(filteredUsers, orderByIteratee, orderByOrder);

  return filteredUsers;
};
exports.getProviders = getProviders;

const getProvider = (id) => {
  const user = getUser(id);

  if (user && user.type === 'provider') return user;

  return null;
};
exports.getProvider = getProvider;

const getUser = (id, accessToken) => users
  .find((user) => (id && user.id === id) || (accessToken && user.accessToken === accessToken));
exports.getUser = getUser;

const getRatings = (filterBy, id, category) => _.orderBy(ratings
  .filter((rating) => rating[filterBy] === id)
  .filter((rating) => !category || rating.category === category)
  .map((rating) => ({ ...rating, provider: getUser(rating.providerId), client: getUser(rating.clientId) })), 'created', 'desc');
exports.getRatings = getRatings;

const getLastService = (filterBy, id) => {
  const userServices = _.orderBy(services
    .filter((service) => service[filterBy] === id), 'created', 'desc');

  if (userServices) {
    const service = userServices[0];

    service.provider = getUser(service.providerId);
    service.client = getUser(service.clientId);

    return service;
  }

  return null;
};
exports.getLastService = getLastService;

const getServices = (filterBy, id) => _.orderBy(services
  .filter((service) => service[filterBy] === id)
  .map((service) => ({ ...service, provider: getUser(service.providerId), client: getUser(service.clientId) })), 'created', 'desc');
exports.getServices = getServices;

const getThreads = (filterBy, id) => _.uniqBy(_.orderBy(messages
  .filter((message) => message[filterBy] === id), 'created', 'desc'), filterBy)
  .map((message) => ({ ...message, provider: getUser(message.providerId), client: getUser(message.clientId) }));
exports.getThreads = getThreads;

const getThread = (providerId, clientId) => {
  const provider = getUser(providerId);
  const client = getUser(clientId);

  return _.orderBy(messages
    .filter((message) => message.providerId === providerId && message.clientId === clientId)
    .map((message) => ({ ...message, provider, client })), 'created', 'asc');
};
exports.getThread = getThread;

const passwordAuthenticate = (email, password) => users
  .find((user) => !!email && !!password && user.email === email && user.password === password);
exports.passwordAuthenticate = passwordAuthenticate;
