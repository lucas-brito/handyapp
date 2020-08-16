import React from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, View
} from 'react-native';
import Drawer from 'react-native-drawer';
import { inject, observer } from 'mobx-react';

import Icon from './Icon';
import NavBar from './NavBar';
import Picture from './Picture';

import Theme from '../lib/Theme';
import { __ } from '../lib/I18n';

const drawerStyles = {
  drawer: {
    backgroundColor: '#fff'
  }
};

const styles = Theme.extend({
  drawerItem: {
    paddingHorizontal: 24,
    paddingVertical: 18
  }
});

export default @inject('store') @observer
class DrawerComponent extends React.Component {
  closeControlPanel = () => {
    this.drawer.close();
  };

  openControlPanel = () => {
    this.drawer.open();
  };

  goBack = () => {
    const { store } = this.props;
    const { navigation } = store.drawer;

    navigation.goBack();
  }

  openUserProfile = () => {
    const { store } = this.props;
    const { navigation } = store.drawer;

    this.closeControlPanel();
    navigation.navigate('UserProfile');
  }

  onSelectDrawerItem = (screen) => {
    if (!screen) return;

    const { store } = this.props;
    const { navigation } = store.drawer;

    this.closeControlPanel();
    navigation.navigate(screen);
  }

  renderDrawerItem = ({
    value, title, screen, onPress
  }, selected) => (
    <TouchableOpacity
      key={value}
      onPress={onPress || (() => this.onSelectDrawerItem(screen))}
      style={styles.drawerItem}
    >
      <View>
        <Text style={[{ fontSize: 16, color: '#c0ccda' }, selected && { color: '#fff', fontWeight: 'bold' }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )

  renderDrawerContent = () => {
    const { store } = this.props;
    const { user, drawer } = store;
    const { fullname, picture } = user;
    const { screen } = drawer;

    const screenOptions = [
      { value: 'home', title: __('Home'), screen: 'Home' },
      { value: 'messages', title: __('Messages'), screen: 'UserMessages' },
      { value: 'history', title: __('History'), screen: 'UserHistory' }
    ];

    const advancedOptions = [
      { value: 'settings', title: __('Settings'), screen: 'Settings' },
      { value: 'rate', title: __('Rate us!') }
    ];

    return (
      <SafeAreaView style={{ backgroundColor: '#1e2d3e' }}>
        <View style={{
          paddingHorizontal: 24, paddingVertical: 48, backgroundColor: '#263445'
        }}
        >
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.openUserProfile}>
            <Picture
              style={styles.picture}
              source={{ uri: picture }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                {fullname}
              </Text>
              <Text style={{ marginTop: 4, color: '#fff', fontSize: 12 }}>
                {__('Edit account')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: '100%', backgroundColor: '#1e2d3e', flexShrink: 1 }}>
          <View style={{
            borderBottomWidth: Theme.hairlineWidth,
            borderBottomColor: '#c0ccda',
            paddingBottom: 48
          }}
          >
            {screenOptions.map((option) => this.renderDrawerItem(option, option.value === screen))}
          </View>
          <View>
            {advancedOptions.map((option) => this.renderDrawerItem(option, option.value === screen))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  render() {
    const { store, children } = this.props;

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={!!store.drawer && !store.drawer.invisible && this.renderDrawerContent()}
        type="overlay"
        tapToClose
        openDrawerOffset={(viewport) => viewport.width - 300} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={0}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <View style={{ height: '100%' }}>
          <SafeAreaView>
            {
            !!store.drawer && (
              <NavBar
                left={store.drawer.type
                  ? (
                    <TouchableOpacity
                      style={styles.center}
                      onPress={store.drawer.onPress || this.goBack}
                    >
                      <Icon name={store.drawer.type === 'back' ? 'arrow-left' : 'times'} />
                    </TouchableOpacity>
                  )
                  : (
                    <TouchableOpacity
                      style={styles.center}
                      onPress={this.openControlPanel}
                    >
                      <Icon name="bars" />
                    </TouchableOpacity>
                  )}
                center={!!store.drawer.title && (
                  typeof store.drawer.title === 'string'
                    ? (
                      <View style={styles.center}>
                        <Text style={styles.navBarTitle}>{store.drawer.title}</Text>
                      </View>
                    )
                    : (
                      <View style={[styles.center, { flexDirection: 'row' }]}>
                        <Picture
                          style={[styles.picture, { width: 32, height: 32, marginRight: 12 }]}
                          source={{ uri: store.drawer.title.picture }}
                        />
                        <Text style={styles.navBarTitle}>{store.drawer.title.text}</Text>
                      </View>
                    )
                )}
                right={store.drawer.right}
              />
            )
          }
          </SafeAreaView>
          {children}
        </View>
      </Drawer>
    );
  }
}
