import { Table } from 'antd'
import React from 'react'
import Etape from './Etape'
import DataManager from '../firebase/manage'

class Produits extends React.Component {

    dataManager;
    columnnProduit = [{
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
    }, {
        title: 'Quantité',
        dataIndex: 'amount',
        key: 'amount',
    }];
    constructor(props) {
        super(props);        
        this.dataManager = DataManager.getDataManager();
        this.dataManager.callbackProduit = this.dataChange;
        this.state = {
            datasource: this.dataManager.dataProduit,
            columns: this.columnnProduit 
        }
        

    }
    dataChange = (data) =>{
        this.setState({
            dataSource : data
        })
    }
    render() {
        return (
            <Table dataSource={this.state.dataSource} columns={this.state.columns} />
        );
    }
}

class Parcours extends React.Component {
    dataManager;
    columnnParcours = [{
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
    }, {
        title: 'Prenom',
        dataIndex: 'prenom',
        key: 'prenom',
    },
    {
        title: 'Parcours',
        dataIndex: 'steps',
        key: 'steps',
        render: function(text, record, index) {
            return <Etape steps ={text} />
            
        }
    }
    ];
    constructor(props) {
        super(props);
        this.dataManager = DataManager.getDataManager();
        this.dataManager.callbackParcours = this.dataChange; 
        this.state = {
            dataSource: this.dataManager.dataParcours,
            columns: this.columnnParcours 
        }

    }

    render() {
        return (
            <Table dataSource={this.state.dataSource} columns={this.state.columns} />
        );
    }
}

export  {Produits,Parcours};