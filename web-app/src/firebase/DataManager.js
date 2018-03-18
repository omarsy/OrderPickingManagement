import * as firebase from "firebase"
class DataManager {

    static instance = null;
    user = null;
    dataProduit = [];
    dataParcours = [];
    callbackProduit = (data) => { };
    callbackParcours = (data) => { };
    callbackAlert = (data) => { };
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

        ((manage) => firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user)
                manage.user = user;
                manage.listenProduct();
                manage.listenPreparation();
            } else {
                this.user = null;
                // No user is signed in.
            }
        }))(this);
    }
    static getDataManager() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager();
            DataManager.instance.configure();
        }
        return DataManager.instance;
    }

    listenProduct(dataChange) {
        var productsRef = firebase.database().ref('produit/');
        productsRef.on('child_added', (data) => {
            this.dataProduit.push(this.productHumainView(data));
            this.callbackProduit(this.dataProduit);
        });

        productsRef.on('child_changed', (data) => {
            var resultat = this.dataProduit.find(item => item.key == data.key);
            var clone = this.productHumainView(data);
            resultat.nom = clone.nom;
            resultat.quantite = clone.quantite;
            resultat.poids = clone.poids;
            if(resultat.quantite === 0){
                this.callbackAlert(resultat)
            }
            this.callbackProduit(this.dataProduit);
        });

        productsRef.on('child_removed', (data) => {
            this.callbackProduit(this.dataProduit);
        });

    }

    listenPreparation(dataChange) {
        var preparationsRef = firebase.database().ref('preparateur/');
        preparationsRef.on('child_added', (data) => {
            this.dataParcours.push(this.preparationHumanView(data));
            this.callbackParcours(this.dataParcours);
            console.log('child_added', data.key, this, data.val());
        });

        preparationsRef.on('child_changed', (data) => {
            var resultat = this.dataParcours.find(item => item.key == data.key);
            let tmp = this.preparationHumanView(data);
            resultat.steps = tmp.steps
            resultat.nom = tmp.nom
            resultat.prenom = tmp.prenom
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
            nom: data.val().nom,
            poids: data.val().poids,
            quantite: data.val().zoneProduitPicking.quantite
        }
    }

    currentUser() {
        console.log(firebase.auth())
        return firebase.auth().currentUser
    }

    preparationHumanView(data) {
        console.log(data)
        return {
            key: data.key,
            nom: data.val().nom,
            prenom: data.val().prenom,
            steps: data.val().regroupementCommande && data.val().regroupementCommande[Object.keys(data.val().regroupementCommande).pop()].steps
        }
    }

    update(update) {
        return firebase.database().ref().update(update).catch(error => { console });
    }
}
export default DataManager.getDataManager();