import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class Icon extends React.Component {
  render() {
    const { children, ...newProps } = this.props;

    return (
      <FontAwesome5
        {...newProps}
      >
        {children}
      </FontAwesome5>
    );
  }
}
