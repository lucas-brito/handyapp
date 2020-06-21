import React from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, View
} from 'react-native';
import Drawer from 'react-native-drawer';
import { inject, observer } from 'mobx-react';

import Icon from './Icon';
import NavBar from './NavBar';

import Theme from '../lib/Theme';
import { __ } from '../lib/I18n';

const drawerStyles = {
  drawer: {
    backgroundColor: '#fff'
  }
};

const styles = Theme.extend({
});

export default @inject('store') @observer
class DrawerComponent extends React.Component {
  closeControlPanel = () => {
    this.drawer.close();
  };

  openControlPanel = () => {
    this.drawer.open();
  };

  render() {
    const { children, store } = this.props;

    if (!store.drawer) return children;

    const { title } = store.drawer;

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={(
          <SafeAreaView>
            <Text>
              Drawer
            </Text>
          </SafeAreaView>
          )}
        type="overlay"
        tapToClose
        openDrawerOffset={(viewport) => viewport.width - 300} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <SafeAreaView style={{ height: '100%' }}>
          <NavBar
            left={(
              <TouchableOpacity
                style={styles.center}
                onPress={this.openControlPanel}
              >
                <Icon name="bars" />
              </TouchableOpacity>
              )}
            center={!!title && (
              <View style={styles.center}>
                <Text style={styles.navBarTitle}>{title}</Text>
              </View>
            )}
          />
          {children}
        </SafeAreaView>

      </Drawer>
    );
  }
}
