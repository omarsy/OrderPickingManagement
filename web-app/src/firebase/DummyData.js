import DataManager from "./DataManager"
import lieuPicking from "../data/lieuPicking"
import produit from "../data/produit"
import preparateur from "../data/preparateur"
import commande from "../data/commande"

class DummyData{

    static insertLieuPicking() {
        let update = {}
        Object.keys(lieuPicking).forEach(element => {
            update["/lieuPicking/" + element] = lieuPicking[element];
        });
        console.log(update)
        DataManager.update(update);
    }
    static insertProduit() {
        let update = {}
        Object.keys(produit).forEach(element => {
            update["/produit/" + element] = produit[element];
        });
        console.log(update)
        DataManager.update(update);
    }
    static insertPreparateur() {
        let update = {}
        Object.keys(preparateur).forEach(element => {
            update["/preparateur/" + element] = preparateur[element];
        });
        console.log(update)
        DataManager.update(update);
    }

    static insertCommande() {
        let update = {}
        Object.keys(commande).forEach(element => {
            update["/commande/" + element] = commande[element];
        });
        console.log(update)
        DataManager.update(update);
    }
}

export default DummyData;