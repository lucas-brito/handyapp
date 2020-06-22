import _ from 'lodash';
import { users } from './TestStorage';

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

const getProvider = (id) => getUser(id)
  .filter((user) => user.type === 'provider');
exports.getProvider = getProvider;

const getUser = (id, accessToken) => users
  .filter((user) => user.id === id || user.accessToken === accessToken);
exports.getUser = getUser;
