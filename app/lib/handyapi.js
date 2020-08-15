/* eslint-disable camelcase */
import axios from 'axios';

exports.createAPI = ({ accessToken, url }) => {
  const api = {};

  api.accessToken = accessToken;
  api.url = url;

  const setParams = (params = {}) => ({
    ...params,
    accessToken: api.accessToken
  });

  const get = (endpoint, params = {}) => {
    const finalParams = (params === false) ? null : { params: setParams(params) };
    console.log(`GET ${api.url}${endpoint}`, finalParams);
    return axios.get(`${api.url}${endpoint}`, finalParams)
      .then((response) => response.data).catch((error) => {
        console.log('get error', error);

        if (error.response) {
          throw error.response.data;
        }
      });
  };
  api.get = get;

  const post = (endpoint, params = {}, header = {}) => {
    const finalParams = (params === false) ? null : { params: setParams(params) };
    let data;

    if (header['Content-Type'] === 'multipart/form-data') {
      data = new FormData();
      Object.keys(finalParams.params).forEach((param) => {
        data.append(param, finalParams.params[param]);
      });
    } else {
      data = finalParams.params;
    }
    console.log(`POST ${endpoint}`, data);

    return axios({
      method: 'post',
      url: `${api.url}/${endpoint}`,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ...header
      },
      data
    }).then((response) => response.data)
      .catch((error) => {
        console.log('post error', error);

        if (error.response) {
          throw error.response.data;
        }
      });
  };

  api.post = post;

  const deleteRequest = (endpoint, params = {}) => { // for some reason can't simply call it delete
    const finalParams = (params === false) ? null : { params: setParams(params) };
    console.log(`DELETE ${endpoint}`, finalParams);
    return axios({
      method: 'delete',
      url: `${api.url}${endpoint}`,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: finalParams.params
    }).catch((error) => {
      console.log('delete error', error);

      if (error.response) {
        throw error.response.data;
      }
    });
  };

  api.delete = deleteRequest;

  const put = (endpoint, params = {}) => {
    const finalParams = (params === false) ? null : { params: setParams(params) };
    console.log(`PUT ${endpoint}`, finalParams);
    return axios({
      method: 'put',
      url: `${api.url}${endpoint}`,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: finalParams.params
    }).then((response) => response.data).catch((error) => {
      console.log('put error', error);

      if (error.response) {
        throw error.response.data;
      }
    });
  };

  api.put = put;

  return api;
};
