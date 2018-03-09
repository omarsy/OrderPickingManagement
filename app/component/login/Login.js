import React, { Component } from 'react';
import {
    ScrollView,
    TextInput,
    View,
    Text,
    StyleSheet
} from 'react-native';
import Container from './Container'
import Label from './Label'
import Button from './Button'
import Icon from 'react-native-fa-icons';
import DataManager from '../../firebase/DataManager'
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "omarsysy@gmail.com",
            password: "123456"
        }
    }
    press = () => {
        console.log("aa");
    }
    connect = () => {
        DataManager.authentification(this.state.username, this.state.password);
    }
    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Container>
                    <Button
                        label="Forgot Login/Pass"
                        styles={{ button: styles.alignRight, label: styles.label }}
                        onPress={this.press.bind(this)} />
                </Container>
                <Container>
                    <Label text="Username or Email" />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                    />
                </Container>
                <Container>
                    <Label text="Password" />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </Container>
                <Container>

                    <View style={styles.footer}>
                        <Container>
                            <Button
                                label="Sign In"
                                styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
                                onPress={this.connect} />
                        </Container>
                        <Container>
                            <Button
                                label="CANCEL"
                                styles={{ label: styles.buttonBlackText }}
                                onPress={this.press.bind(this)} />
                        </Container>
                    </View>
                </Container>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#E1D7D8',
        padding: 30,
        flexDirection: 'column'
    },
    label: {
        color: '#0d8898',
        fontSize: 20
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
    textInput: {
        height: 80,
        fontSize: 30,
        backgroundColor: '#FFF'
    },
    buttonWhiteText: {
        fontSize: 20,
        color: '#FFF',
    },
    buttonBlackText: {
        fontSize: 20,
        color: '#595856'
    },
    primaryButton: {
        backgroundColor: '#34A853'
    },
    footer: {
        marginTop: 100
    }
});