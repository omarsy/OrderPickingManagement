import * as firebase from "firebase"

class DataManager {

    static instance = null;
    configure() {
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
    static getDataManager(){
            if (instance == null){
               instance = new DataManager();
               instance.configure();
            }
            return instance;
    }

    listenProduct(dataChange) {
        var productsRef = firebase.database().ref('produits/');
        productsRef.on('child_added', (data) => {
            this.state.datasource.push(this.productHumainView(data));
            this.setState({
                datasource: this.state.datasource
            })
            console.log('child_added', data.key, this, data.val());
        });

        productsRef.on('child_changed', (data) => {
            const resultat = this.state.datasource.find(item => item.key == data.key);
            resultat = this.productHumainView(data);
            this.setState({
                datasource: this.state.datasource
            })
            console.log('child_changed', data.key, data.val());
        });

        productsRef.on('child_removed', (data) => {
            console.log('child_removed', data.key, data.val());
        });

    }

    listenPreparation (dataChange){
        var preparationsRef = firebase.database().ref('preparateur/');
        productsRef.on('child_added', (data) => {
            this.state.datasource.push(this.productHumainView(data));
            this.setState({
                datasource: this.state.datasource
            })
            console.log('child_added', data.key, this, data.val());
        });

        productsRef.on('child_changed', (data) => {
            const resultat = this.state.datasource.find(item => item.key == data.key);
            resultat = this.productHumainView(data);
            this.setState({
                datasource: this.state.datasource
            })
            console.log('child_changed', data.key, data.val());
        });

        productsRef.on('child_removed', (data) => {
            console.log('child_removed', data.key, data.val());
        });
    }
    productHumainView(data) {
        return {
            key: data.key,
            nom: data.nom,
            poids: data.poids,
            quantite: ((data) => {
                let val = Object.values(data.val().zoneProduitPicking.produits);
                let nb = 0
                for (v in val) {
                    if (v)
                        nb + 1
                }
                return nb;
            })()
        }
    }

    preparationHumanView (data){
        return {
            key: data.key,
            nom: data.val().nom,
            prenom: data.val().prenom,
            steps: data.val().regroupementCommande.steps
        }
    }

}