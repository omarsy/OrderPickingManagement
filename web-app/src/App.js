import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyTable from './components/MyTable'
import { Layout } from 'antd'
import { Menu } from 'antd'
class App extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <Layout>
        <Layout.Header></Layout.Header>
        <Layout>
          <Layout.Sider><Menu theme="dark">
            <Menu.Item>Suivre le stock </Menu.Item>
            <Menu.Item>Suivre la preparation</Menu.Item>
          </Menu></Layout.Sider>
          <Layout.Content><MyTable /></Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
