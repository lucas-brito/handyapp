import { observable, extendObservable } from 'mobx';
// import { Platform } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

// DEFAULT STORE STRUCTURE
const defaultStore = {
  accessToken: null
};

// FUNCTION TO CREATE A DEFAULT STORE
const createStore = (store = {}) => {
  const observableDefaultStore = observable(defaultStore);
  return (extendObservable(observableDefaultStore, store));
};

// const LocalStorage = class LocalStorage { // CLASS TO HANDLE ERRORS OF LOCAL STORAGE
//   static maxLength = 9 * 1024 * 1024; /* BYTES */

//   static getItem = async (item) => {
//     try {
//       return await AsyncStorage.getItem(item);
//     } catch (e) {
//       console.log('On getItem, ' + e);
//     }
//   }

//   static setItem = async (item, value) => {
//     try {
//       let willHaveTotalSize = 0;
//       const data = await LocalStorage.getItem(item);
//       /* GET TOTAL SIZE OF MEMORY USED */
//       willHaveTotalSize = value.length * 2;
//       if (data != null && typeof data === 'string') {
//         willHaveTotalSize += (data.length * 2);
//       }

//       /* ONLY IN ANDROID OS HAVE MEMORY LIMIT */
//       if (Platform.OS === 'android') {
//         /* CHECK IF CAN SAVE DATA */
//         if (willHaveTotalSize > LocalStorage.maxLength) {
//           await LocalStorage.clearCache();
//           console.log('Max cache persistor has been done.');
//         } else {
//           await AsyncStorage.setItem(item, value);
//           console.log('Used ' + (willHaveTotalSize / (1024 * 1024)) + ' Mb in LocalStorage');
//         }
//       } else {
//         await AsyncStorage.setItem(item, value);
//         console.log('Used ' + (willHaveTotalSize / (1024 * 1024)) + ' Mb in LocalStorage');
//       }
//     } catch (e) {
//       console.log('In AsyncStorage, ' + e);
//       await LocalStorage.clearCache();
//     }
//   }

//   static removeItem = async (item) => {
//     try {
//       await AsyncStorage.removeItem(item);
//     } catch (e) {
//       console.log('On remove data, ' + e);
//     }
//   }

//   static clear = async () => {
//     try {
//       await AsyncStorage.clear();
//     } catch (e) {
//       console.log('On clear, ' + e);
//     }
//   }

//   static clearCache = async () => {
//     await AsyncStorage.setItem('apollo-cache-persist', '{}');
//   }
// };

// export { createStore, defaultStore, LocalStorage };
export { createStore, defaultStore };
