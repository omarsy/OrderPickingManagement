import React, { Component } from 'react'
import { Text, Modal, Button, ScrollView, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import List from './List'
import Icon from 'react-native-fa-icons';
import DataManager from '../firebase/DataManager';
import QRCodeScanner from 'react-native-qrcode-scanner';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: DataManager.currentStep,
            modalVisible: false,
        }
    }
    setModalVisible(visible) {
        DataManager.prendreProduit(0);
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
    render() {
        return (
            <View style={{ height: Dimensions.get('window').height }}>
                <ScrollView >
                    {this.state.step && <List allee={this.state.step.allee} section={this.state.step.allee} produits={this.state.step.produits} />}
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
                    }}
                >
                    <Icon name={"camera"} size={40} color="#01a699" />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <QRCodeScanner />
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