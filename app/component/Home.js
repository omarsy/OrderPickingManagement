import React, { Component } from 'react'
import { Text, Modal, Button, ScrollView, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import List from './List'
import Icon from 'react-native-fa-icons';
import DataManager from '../firebase/DataManager';
import QRCodeScanner from 'react-native-qrcode-scanner';
class Home extends Component {

    isAlert= false;
    constructor(props) {
        super(props);
        this.state = {
            step: DataManager.currentStep,
            modalVisible: false,
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount() {
        DataManager.callbackPreparation = this.stepChange;
    }
    stepChange = (step) => {
        this.setState({
            step: step
        })
    }
    prendreProduit = (data) =>{
        this.setModalVisible(false);
        if(this.isAlert){
            DataManager.alertProduit(data.data);
        }else{
            DataManager.prendreProduit(data.data);
        }
        
    }
    commencerUnNouveau = () =>{
        DataManager.commencerUnNouveau()
    }
    render() {
        return (
            <View style={{ height: Dimensions.get('window').height }}>
                <ScrollView >
                    {(this.state.step) ? <List allee={this.state.step.allee} section={this.state.step.allee} produits={this.state.step.produits} /> : <Button
                                title="Démarrer un nouveau parcours"
                                color="#ff0000"
                                onPress={() => {
                                    this.commencerUnNouveau();
                                }}/>}
                </ScrollView>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#0000ff',
                        borderRadius: 100,
                        position: "absolute",
                        bottom: 80,
                        right: 10
                    }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.isAlert = false
                    }}
                >
                    <Icon name={"camera"} size={40} color="#01a699" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#ff0000',
                        borderRadius: 100,
                        position: "absolute",
                        bottom: 80,
                        left: 10
                    }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.isAlert = true
                    }}
                >
                    <Icon name={"exclamation-triangle"} size={40} color="#01a699" />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <QRCodeScanner onRead={this.prendreProduit}/>
                    <View style={{ marginTop: 10 }}>
                        <View>
                        
                            <Button
                                title="Fermer"
                                color="#ff0000"
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View >

        );
    }
}
export default Home;