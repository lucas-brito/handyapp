import { StyleSheet, Platform } from 'react-native';
import { merge } from 'lodash';

const defaults = {
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBarTitle: {
    fontWeight: '400',
    fontSize: 18
  },

  input: {
    height: 40,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5'
  },
  button: {
    padding: 14,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 8
  },
  grayishButton: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: '#f1f3f5',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  warningText: {
    fontSize: 16,
    color: '#F03E3E',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0080FF',
  },
  buttonText: {
    fontSize: 16
  },
  formField: {
    margin: 16
  },
  icon: {
    marginRight: 8,
    textAlign: 'center'
  },
};

exports.hairlineWidth = StyleSheet.hairlineWidth;

const extend = (styles, clean = false) => {
  const platformStyles = {};

  if (styles) {
    Object.keys(styles).forEach((name) => {
      let { ios, android, ...style } = { ...styles[name] };

      if (ios && Platform.OS === 'ios') {
        style = { ...style, ...ios };
      }

      if (android && Platform.OS === 'android') {
        style = { ...style, ...android };
      }

      platformStyles[name] = style;
    });
  }

  if (clean) {
    return StyleSheet.create(platformStyles);
  }

  return StyleSheet.create(merge({}, defaults, platformStyles));
};
exports.extend = extend;

const create = (styles) => extend(styles, true);
exports.create = create;
