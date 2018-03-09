import * as firebase from "firebase"

class DataManager {

    static instance = null;
    callbackUserChange = (user) => { console.log(user, "DataManager") };
    callbackPreparation = (data) => { console.log(data, "DataManager") };
    dataPreparation = null;
    currentStep = null;
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
                    (user) => { DataManager.getDataManager().callbackUserChange(user) }
                ).catch((error) => { console.log(error) });
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
        let index = data.val().steps.findIndex(item => (item.produits.find(item => item.quantite > item.quantitePrise) != null));
        let step = (index > -1) ? data.val().steps[index] : null
        return step && {
            key: index,
            allee: step.allee,
            section: step.section,
            produits: step.produits
        }
    }
    prendreProduit(id) {
        let user = this.currentUser()
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var update = {};
        update['preparateur/' + user.uid + '/regroupementCommande/'
            + this.dataPreparation.key +
            '/steps/' + this.currentStep.key + '/produits/' +
            id + '/quantitePrise'] = this.currentStep.produits[id].quantitePrise + 1


        return firebase.database().ref().update(update);
    }

}
export default DataManager.getDataManager();