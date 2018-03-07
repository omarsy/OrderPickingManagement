import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Produits, Parcours } from './components/MyTable'
import { Layout } from 'antd'
import { Menu } from 'antd'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isParcours: false
    }
  }
  toggle =(item) =>{
      if ( item.key === "item_0")
        this.setState({
          isParcours: false
        });
      else
      this.setState({
        isParcours: true
      });
  }
  render() {
    const isParcours = this.state.isParcours;
    return (
      <Layout>
        <Layout.Header></Layout.Header>
        <Layout>
          <Layout.Sider><Menu theme="dark" onClick = { this.toggle}>
            <Menu.Item >Suivre le stock </Menu.Item>
            <Menu.Item>Suivre la preparation</Menu.Item>
          </Menu></Layout.Sider>
          <Layout.Content>{(isParcours) ? (<Parcours />) : (<Produits />)}</Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
