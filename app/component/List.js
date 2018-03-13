import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

class List extends Component {
    state = {
        allee: 12,
        section: 13,
        produits: [
            {
                id: 0,
                etage: 1,
                etageSection: 2,
                nom: "omar",
                quantite: 2
            },
            {
                id: 1,
                etage: 1,
                etageSection: 2,
                nom: "omar",
                quantite: 2
            },
            {
                id: 2,
                etage: 1,
                etageSection: 2,
                nom: "omar",
                quantite: 0
            },
            {
                id: 3,
                etage: 1,
                etageSection: 2,
                nom: "omar",
                quantite: 2
            }
        ]
    }
    alertItemName = (item) => {
        alert(item.name)
    }
    render() {
        return (
            <View>
                <Text style={styles.titleText} >
                    {"ALLEE:" + this.props.allee + " , SECTION:" + this.props.section}
                </Text>
                {
                    Object.keys(this.props.produits).map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={((this.props.produits[key].quantite < this.props.produits[key].quantitePrise) ? (styles.containerZero) : (styles.container))}
                            onPress={() => this.alertItemName(this.props.produits)}>

                            <Text style={styles.text}>
                                {this.props.produits[key].nom + "*" + (this.props.produits[key].quantite - this.props.produits[key].quantitePrise) }
                            </Text>
                            <Text style={styles.text}>
                                {"ETAGE: " + this.props.produits[key].etage + " ,ETAGE SECTION: " + this.props.produits[key].etageSection}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}
export default List

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#cd5c5c',
        alignItems: 'center',
    },
    containerZero: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#000000'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: "#0000ff",
        textAlign: "center"
    }
})