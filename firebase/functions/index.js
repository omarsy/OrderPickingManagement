const functions = require('firebase-functions');
const admin = require('firebase-admin');
const eventEmitter = require('events');
const events = new eventEmitter();
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.calcul = functions.https.onRequest((request, response) => {

    let val = null
    process(request.query.user, request.query.poids)
    return response.send("{}");
});

function getAllRoad(steps) {
    admin.database().ref('lieuPicking').once("value").then(
        (value) => {
            return events.emit("ROAD_FINISH", value.val(), steps)
        }
    ).catch((error) => console.error(error));
}

function getAllCommandDispo() {
    admin.database().ref('commande').orderByChild("preparateur").equalTo(null).once("value").then(
        (value) => {
            return events.emit("COMMAND_FINISH", value.val())
        }
    ).catch((error) => console.error(error))
}

function process(user, poids) {

    commandes = null;
    events.on("COMMAND_FINISH", function (command) {
        commandes = getCommande(poids, command);
        makeSteps(commandes);
    })
    events.on("MAKE_STEPS_FINISH", getAllRoad)
    events.on("ROAD_FINISH", getSteps)
    events.on("STEPS_ORDER_FINISH", function (steps) {
        send(user, steps, commandes)
    })
    getAllCommandDispo()
}
function send(user, steps, commandes) {
    keyCommandes = commandes.map(item => item.key)
    updates = {}
    for (key in keyCommandes)
        updates["commande/" + keyCommandes[key] + "/preparateur/"] = user
    admin.database().ref('preparateur/' + user + '/regroupementCommande').push({
        commande: keyCommandes,
        steps: steps
    })
    admin.database().ref().update(updates)
}
function getCommande(poids, listCommandes) {
    let commandes = []
    let currentPoids = 0
    for (let i = 0; i < Object.keys(listCommandes).length; i++) {
        if (listCommandes[Object.keys(listCommandes)[i]].poids + currentPoids <= poids) {
            currentPoids += listCommandes[Object.keys(listCommandes)[i]].poids
            commandes.push(Object.assign({ key: Object.keys(listCommandes)[i] }, listCommandes[Object.keys(listCommandes)[i]]))
        }
    }

    return commandes

}
function makeSteps(commandes, callback) {
    steps = []
    let produits = getProduits(commandes);
    {
        let i = 0
        let keys = Object.keys(produits);
        make = (keys, i, steps, produits) => (admin.database().ref('produit/' + keys[i]).once("value").then(
            (value) => {
                console.log(steps, value.val());
                item = steps.find(item => (item.section === value.val().zoneProduitPicking.section && item.allee === value.val().zoneProduitPicking.allee))
                let produit = {
                    etage: value.val().zoneProduitPicking.etage,
                    etageSection: value.val().zoneProduitPicking.etageSection,
                    nom: value.val().nom,
                    quantite: produits[keys[i]],
                    quantitePrise: 0
                }
                if (item) {
                    item.produits[keys[i]] = produit
                } else {
                    steps.push({
                        allee: value.val().zoneProduitPicking.allee,
                        section: value.val().zoneProduitPicking.section,
                        produits: {}
                    })
                    steps[steps.length - 1]["produits"][keys[i]] = produit
                }
                i++;
                if (i < keys.length) {
                   return make(keys, i, steps, produits)
                } else {
                   return events.emit("MAKE_STEPS_FINISH", steps)
                }
            }
        ).catch(error => console.log(error)))
        make(keys, i, steps, produits);
    }
}
function getProduits(commandes) {
    let produits = {}
    console.log(commandes);
    let keys = Object.keys(commandes)
    for (let i = 0; i < keys.length; i++) {
        produitKeys = Object.keys(commandes[keys[i]].produit);
        for (let j = 0; j < produitKeys.length; j++) {
            if (produits[produitKeys[j]]) {
                produits[produitKeys[j]] += commandes[keys[i]].produit[produitKeys[j]].quantite
            } else {
                produits[produitKeys[j]] = commandes[keys[i]].produit[produitKeys[j]].quantite
            }
        }
    }
    return produits;
}
function getSteps(allplace, lieu) {
    steps = []
    steps.push(lieu[0])
    lieu = lieu.filter((item, key) => key !== 0);
    while (lieu.length > 0) {
        let proche = pCChemin(allplace, steps[steps.length - 1], lieu)
        if (proche !== null) {
            steps.push(lieu[proche])
            lieu = lieu.filter((item, key) => key !== proche);
        } else {
            steps.push(lieu[0])
            lieu = lieu.filter((item, key) => key !== 0);
        }
    }
    events.emit("STEPS_ORDER_FINISH", steps)
}

function pCChemin(allplace, debut, vers) {
    proche = null
    min = -1
    for (let i = 1; i < vers.length; i++) {
        allee = allplace["allee"][debutAllee.allee]
        section = allee["section"][debutAllee.section]
        Secvers = section["vers"]
        versAllee = Secvers["allee"][vers[i].allee]
        versSection = (versAllee) ? versAllee["section"][vers[i].section] : null;
        if (versSection !== null && (min === -1 || min > versSection)) {
            proche = i;
            min = versSection;
        }
    }
    return proche
}