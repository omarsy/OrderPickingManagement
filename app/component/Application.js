
import React, { Component } from 'react';
import {Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Home from './Home'
import Icon from 'react-native-fa-icons';
import TabNavigator from 'react-native-tab-navigator';
import DataManager from '../firebase/DataManager';
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
    DataManager.listenPreparation()
  }
  deconnexion(){
    DataManager.deconnexion()
  }
  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Icon name={"home"} />}
          renderSelectedIcon={() => <Icon name={"home"} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Icon name={"user"} />}
          renderSelectedIcon={() => <Icon name={"user"} />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          <Button
            title="Deconnexion"
            color="#0000ff"
            onPress={() => {
              this.deconnexion();
            }}
          />
        </TabNavigator.Item>
      </TabNavigator>

    );
  }
}
export default Application;