import React from 'react';
import { Image } from 'react-native';

import { defaultPicture } from '../lib/utils';

export default class Picture extends React.Component {
  render() {
    const { source, ...newProps } = this.props;

    if (!source.uri) source.uri = defaultPicture;

    return (
      <Image
        {...newProps}
        source={source}
      />
    );
  }
}
