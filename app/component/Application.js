
import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Home from './Home'
import Icon from 'react-native-fa-icons';
import TabNavigator from 'react-native-tab-navigator';
import DataManager from '../firebase/DataManager';

class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab:'home'
    }
    DataManager.listenPreparation()
  }
  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Icon name={"camera"} />}
          renderSelectedIcon={() => <Icon name={"camera"} />}
          badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Icon name={"camera"} />}
          renderSelectedIcon={() => <Icon name={"camera"} />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          <QRCodeScanner />
        </TabNavigator.Item>
      </TabNavigator>

    );
  }
}
export default Application;