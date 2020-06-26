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
  button: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#f1f3f5',
    borderRadius: 6
  },
  roundedButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  labelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 0,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  labelButtonSelected: {
    backgroundColor: '#343F4B',
    borderRadius: 25,
    borderColor: '#f1f3f5'
  },
  labelButtonTextSelected: {
    color: '#fff'
  },
  text: {
    fontSize: 14,
    color: '#969faa'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionTitleText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  }
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
