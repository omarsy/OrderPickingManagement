import * as firebase from "firebase"

class DataManager {

    static instance = null;
    callbackUserChange = (user) => { console.log(user, "DataManager") };
    callbackPreparation = (data) => { console.log(data, "DataManager") };
    dataPreparation = null;
    currentStep = null;
    preparateur = null;
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
        (callbackUserChange) => (firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                callbackUserChange(user);
            } else {
                callbackUserChange(user);
            }
        }))(this.callbackUserChange)
    }
    static getDataManager() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager();
            DataManager.instance.configure();
        }
        return DataManager.instance;
    }

    deconnexion(){
        firebase.auth().signOut().then(function() {
            DataManager.getDataManager().callbackUserChange(null)
            alert('Signed Out');

          }, function(error) {
            alert(error.message);
          });
    }
    authentification(email, password) {

        console.log(email)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.

                return firebase.auth().signInWithEmailAndPassword(email, password).then(
                    (user) => {
                        DataManager.getDataManager().callbackUserChange(user)
                        firebase.database().ref('preparateur/' + user.uid).once("value").then((value) => {
                            DataManager.getDataManager().preparateur = value;
                        })
                    }
                ).catch((error) => { alert(error.message) });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error)
            });
    }
    currentUser() {
        return firebase.auth().currentUser;
    }
    listenPreparation() {
        let user = this.currentUser()
        var preparationsRef = firebase.database().ref('preparateur/' + user.uid + '/regroupementCommande/');
        console.log(preparationsRef)
        preparationsRef.on('child_added', (data) => {
            this.dataPreparation = data;
            this.currentStep = this.getCurrentStep(this.dataPreparation);
            this.callbackPreparation(this.currentStep);
            console.log('child_added', data.key, this, data.val());
        });

        preparationsRef.on('child_changed', (data) => {
            this.dataPreparation = data;
            this.currentStep = this.getCurrentStep(this.dataPreparation);
            this.callbackPreparation(this.currentStep);
            console.log('child_changed', data.key, data.val());
        });

        preparationsRef.on('child_removed', (data) => {
            this.callbackParcours(this.dataParcours);
            console.log('child_removed', data.key, data.val());
        });
    }

    getCurrentStep(data) {
        let index = data.val().steps.findIndex(item => (Object.keys(item.produits).find(key => item.produits[key].quantite > item.produits[key].quantitePrise) != null));
        let step = (index > -1) ? data.val().steps[index] : null
        return step && {
            key: index,
            allee: step.allee,
            section: step.section,
            produits: step.produits
        }
    }
    prendreProduit(id) {
        if (this.currentStep.produits[id]) {
            let user = this.currentUser()
            var update = {};
            console.log(this.currentStep, id);
            let urlQuantite = 'produit/' + id + '/zoneProduitPicking/quantite'
            update['preparateur/' + user.uid + '/regroupementCommande/'
                + this.dataPreparation.key +
                '/steps/' + this.currentStep.key + '/produits/' +
                id + '/quantitePrise'] = this.currentStep.produits[id].quantitePrise + 1

            firebase.database().ref(urlQuantite).once('value').then(function (snapshot) {
                update[urlQuantite] =(snapshot.val() == 0)? 0: (snapshot.val() - 1);
                firebase.database().ref().update(update);
            });
        } else {
            alert("Produit : " + id + " ne doit pas se trouver dans votre placement recent")
        }

    }
    alertProduit(id){
        if (this.currentStep.produits[id]) {
            let update = {}
            update['produit/' + id + '/zoneProduitPicking/quantite'] = 0;
            firebase.database().ref().update(update);
        }else {
            alert("Produit : " + id + " ne doit pas se trouver dans votre placement recent")
        }
    }
    commencerUnNouveau() {

        console.log('GET', 'http://localhost:5000/ecommerce-987a2/us-central1/calcul?user=' + this.preparateur.key + '&poids=' + this.preparateur.val().capaciteMax);
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log('success', request.responseText);
            } else {
                console.warn('error');
            }
        };

        request.open('GET', 'https://us-central1-ecommerce-987a2.cloudfunctions.net/calcul?user=' + this.preparateur.key + '&poids=' + this.preparateur.val().capaciteMax);
        request.send();
    }
}
export default DataManager.getDataManager();