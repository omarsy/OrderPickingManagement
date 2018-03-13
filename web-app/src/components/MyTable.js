import { Table } from 'antd'
import React from 'react'
import Etape from './Etape'
import DataManager from '../firebase/DataManager'

class Produits extends React.Component {

    dataManager;
    columnnProduit = [{
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
    }, {
        title: 'Quantité',
        dataIndex: 'quantite',
        key: 'quantite',
    }];
    constructor(props) {
        super(props);        
        this.state = {
            dataSource: DataManager.dataProduit,
            columns: this.columnnProduit 
        }
        

    }
    componentDidMount() {
        DataManager.callbackProduit = this.dataChange;
        this.setState ( {
            dataSource: DataManager.dataProduit,
        })
    }
    componentWillUnmount(){
        DataManager.callbackProduit = (data)=>{};
    }
    
    dataChange = (data) =>{
        console.log(data,this);
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
        this.state = {
            dataSource: DataManager.dataParcours,
            columns: this.columnnParcours 
        }

    }
    componentDidMount() {
        DataManager.callbackParcours = this.dataChange;
        this.setState ( {
            dataSource: DataManager.dataParcours,
        })
    }
    componentWillUnmount(){
        DataManager.callbackProduit = (data)=>{};
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

export  {Produits,Parcours};