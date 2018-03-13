import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Produits, Parcours } from './components/MyTable'
import { Layout } from 'antd'
import { Menu, Alert } from 'antd'
import DummyData from './firebase/DummyData'
import DataManager from './firebase/DataManager'
class App extends Component {
  constructor(props) {
    super(props);

    DummyData.insertLieuPicking();
    DummyData.insertProduit();
    DummyData.insertCommande();
    DummyData.insertPreparateur();



    this.state = {
      isParcours: false,
      alerts: [<Alert key="0" message="ooo" closable={true} type="error" />]
    }
  }
  componentDidMount() {
    DataManager.callbackAlert = this.addAlerts
  }
  addAlerts = (alert) => {
    let alerts = this.state.alerts;
    alerts.push(<Alert key={alert.key} message={alert.nom +" en rupture de stock"} closable={true} type="error" />);
    this.setState({
      alerts: alerts
    })
  }
  toggle = (item) => {
    if (item.key === "item_0")
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
        <Layout.Header> Order Picking Management</Layout.Header>
        <Layout>
          <Layout.Sider><Menu theme="dark" onClick={this.toggle}>
            <Menu.Item >Suivre le stock </Menu.Item>
            <Menu.Item>Suivre la preparation</Menu.Item>
          </Menu></Layout.Sider>
          <Layout.Content>
            {this.state.alerts}
            {(isParcours) ? (<Parcours />) : (<Produits />)}</Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
