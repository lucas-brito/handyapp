import { observable, extendObservable } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

// DEFAULT STORE STRUCTURE
const defaultStore = {
  accessToken: null
};

// FUNCTION TO CREATE A DEFAULT STORE
const createStore = (store = {}) => {
  const observableDefaultStore = observable(defaultStore);
  return (extendObservable(observableDefaultStore, store));
};

const LocalStorage = class LocalStorage { // CLASS TO HANDLE LOCAL STORAGE ERRORS
  static getItem = async (item, onError) => {
    try {
      return await AsyncStorage.getItem(item);
    } catch (e) {
      console.log(`(AsyncStorage) On getItem, ${e}`);
      if (onError) onError();
    }
  }

  static setItem = async (item, value, onError) => {
    try {
      await AsyncStorage.setItem(item, value);
    } catch (e) {
      console.log(`(AsyncStorage) On setItem: ${e}`);
      if (onError) onError();
    }
  }

  static removeItem = async (item, onError) => {
    try {
      await AsyncStorage.removeItem(item);
    } catch (e) {
      console.log(`(AsyncStorage) On removeItem: ${e}`);
      if (onError) onError();
    }
  }

  static multiGet = async (items, onError) => {
    try {
      return AsyncStorage.multiGet(items);
    } catch (e) {
      console.log(`(AsyncStorage) On multiGet: ${e}`);
      if (onError) onError();
    }
  }
};

export { createStore, defaultStore, LocalStorage };
