import React from 'react';
import Toast from 'react-native-tiny-toast';

const defaultToastProps = {
  position: Toast.position.center,
  duration: 4000,
  animation: true
};

export default class TinyToast extends React.Component {
  static showError = (message, toastProps) => Toast.show(message, {
    containerStyle: {
      backgroundColor: '#fbb9b9',
      borderWidth: 1,
      borderColor: '#d87272'
    },
    textStyle: {
      color: '#b51515',
    },
    ...defaultToastProps,
    ...toastProps
  });

  static showSuccess = (message, toastProps) => Toast.show(message, {
    containerStyle: {
      backgroundColor: '#6ad46a',
      borderWidth: 1,
      borderColor: '#22b722'
    },
    textStyle: {
      color: '#175817',
    },
    ...defaultToastProps,
    ...toastProps
  });
}
