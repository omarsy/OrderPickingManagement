import { Table } from 'antd'
import  React  from 'react'
import * as firebase from "firebase"

class MyTable extends React.Component {

    configure(){
        var config = {
            apiKey: "AIzaSyA6lTOn93YbkhdjSGavm5PMzv-zxZKZqSY",
            authDomain: "ecommerce-987a2.firebaseapp.com",
            databaseURL: "https://ecommerce-987a2.firebaseio.com",
            projectId: "ecommerce-987a2",
            storageBucket: "ecommerce-987a2.appspot.com",
            messagingSenderId: "55136966274"
          };
          firebase.initializeApp(config);
    }
    constructor(props) {
        super(props);
        this.configure();
          var email = "omarsysy@gmail.com";
          var password = "123456";
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function(error) {
          // Handle Errors here.
          console.log(error);
        });
          
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
           console.log(user);
          }
        });
        this.state = {
            datasource: [],
            columns: [{
                title: 'Nom',
                dataIndex: 'nom',
                key: 'nom',
            }, {
                title: 'Quantité',
                dataIndex: 'amount',
                key: 'amount',
            }]
        }
        
    }
    
    initProduit(){
        var productsRef = firebase.database().ref('produits/');
        productsRef.on('child_added', (data) => {
            this.state.datasource.push({
                key: data.key,
                nom: data.val().name,
                amount: data.val().amount
            });
            this.setState({
                datasource : this.state.datasource
            })
            console.log('child_added', data.key, this,data.val());
        });

        productsRef.on('child_changed', (data) => {
            const resultat = this.state.datasource.find( item => item.key == data.key);
            resultat.amount = data.val().amount;
            resultat.nom = data.val().name
            this.setState({
                datasource : this.state.datasource
            })
            console.log('child_changed', data.key, data.val());
        });

        productsRef.on('child_removed', (data) => {
            console.log('child_removed', data.key, data.val());
        });
        var newPostKey = firebase.database().ref().child('lieuPicking').push().key;
        firebase.database().ref('lieuPicking/alleeX/10/alleeY/12').set({
          distance:11
            
          });
    }
    render() {
        return (
            <Table dataSource={this.state.datasource} columns={this.state.columns} />
        );
    }
}

export default MyTable;