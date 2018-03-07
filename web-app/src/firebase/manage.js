import * as firebase from "firebase"

class DataManager {

    static instance = null;
    dataProduit =[];
    dataParcours = [];
    callbackProduit;
    callbackParcours;
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
        var email = "omarsysy@gmail.com";
        var password = "123456";
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function (error) {
                // Handle Errors here.
                console.log(error);
            });
    }
    static getDataManager(){
            if (DataManager.instance == null){
                DataManager.instance = new DataManager();
                DataManager.instance.configure();
            }
            return DataManager.instance;
    }

    listenProduct(dataChange) {
        var productsRef = firebase.database().ref('produits/');
        productsRef.on('child_added', (data) => {
            this.dataProduit.push(this.productHumainView(data));
            this.callbackProduit(this.dataProduit);
            console.log('child_added', data.key, this, data.val());
        });

        productsRef.on('child_changed', (data) => {
            var resultat = this.dataProduit.find(item => item.key == data.key);
            resultat = this.productHumainView(data);
            this.callbackProduit(this.dataProduit);
            console.log('child_changed', data.key, data.val());
        });

        productsRef.on('child_removed', (data) => {
            this.callbackProduit(this.dataProduit);
            console.log('child_removed', data.key, data.val());
        });

    }

    listenPreparation (dataChange){
        var preparationsRef = firebase.database().ref('preparateur/');
        preparationsRef.on('child_added', (data) => {
            this.dataParcours.push(this.productHumainView(data));
            this.callbackParcours(this.dataParcours);
            console.log('child_added', data.key, this, data.val());
        });

        preparationsRef.on('child_changed', (data) => {
            var resultat = this.dataParcours.find(item => item.key == data.key);
            resultat = this.productHumainView(data);
            this.callbackParcours(this.dataParcours);
            console.log('child_changed', data.key, data.val());
        });

        preparationsRef.on('child_removed', (data) => {
            this.callbackParcours(this.dataParcours);
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
                for (let v in val) {
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

    insertProduct()
    {
        
    }

}
export default DataManager;