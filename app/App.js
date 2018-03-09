import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Login from './component/login/Login';
import Application from './component/Application'
import DataManager from './firebase/DataManager'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: DataManager.currentUser()
    }
    console.log(DataManager.currentUser());
    DataManager.callbackUserChange = this.userChange;
  }
  userChange = (user) => {
    console.log(user);
    this.setState({
      user: user
    })
  }
  render() {
    const isUser = (this.state.user !== null)
    return (
      
        (isUser)?<Application/>:<Login/>
    );
  }
}