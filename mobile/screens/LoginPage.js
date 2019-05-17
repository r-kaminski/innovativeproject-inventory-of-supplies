import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {signIn} from "../services/AuthService";
import {registerIn} from "../services/AuthService";
import {Input} from "react-native-elements";

export default class LoginPage extends React.Component {
    
    state = {
        login: null,
        password1: null,
        password2: null,
        email: null,
        error: null,
        mode: 'login'
    
    }

    currentMode() {
        return this.state.mode;
}
    render() {
        if (this.currentMode() === 'login'){
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", justifyContent: "center"}}
                        keyboardShouldPersistTaps='handled'>
                <View style={styles.wrapper}>
                <Text style={styles.header}>MAKERSPACE</Text>
                    <Input
                        placeholder='Login'
                        leftIcon={{type: 'feather', name: 'user', size: 18, color: '#d0d0d0'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputStyle={{color: 'white'}}
                        onChange={(e) => {
                            this.setState({login: e.nativeEvent.text})
                        }}
                        value={this.state.login}
                    />

                    <Input
                        placeholder='Password'
                        leftIcon={{type: 'feather', name: 'lock', size: 18, color: '#d0d0d0'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputStyle={{color: 'white'}}
                        secureTextEntry
                        onChange={(e) => {
                            this.setState({password1: e.nativeEvent.text})
                        }}
                        value={this.state.password1}
                        errorMessage={this.state.error ? "Wrong login or password" : null}
                    />

                </View>

                <Button style={styles.button} onPress={() => {
                    signIn(this.state.login, this.state.password1).then(
                        (res) => res ? this.props.signIn()
                            : this.setState({login: null, password1: null, error: true})
                    )
                }} title={"Log in"}
                        color={"#40c1ac"}/>

                <Button style={styles.button} onPress={() => {
                  this.setState({mode: 'register'})
                }} title={"I'm new here"}
                        color={"#40c1ac"}/>
            </ScrollView>
        )
    }
    else{
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", justifyContent: "center"}}
                        keyboardShouldPersistTaps='handled'
            >
                <View style={styles.wrapper}>
                    <Text style={styles.header}>MAKERSPACE</Text>
                   
                    <Input
                        placeholder='Login'
                        leftIcon={{type: 'feather', name: 'user', size: 18, color: '#d0d0d0'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputStyle={{color: 'white'}}
                        onChange={(e) => {
                            this.setState({login: e.nativeEvent.text})
                        }}
                        value={this.state.login}
                    />

                    <Input
                        placeholder='Email'
                        leftIcon={{type: 'feather', name: 'user', size: 18, color: '#d0d0d0'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputStyle={{color: 'white'}}
                        onChange={(e) => {
                            this.setState({email: e.nativeEvent.text})
                        }}
                        value={this.state.email}
                        errorMessage={this.state.error ? "Wrong email" : null}
                    />

                    <Input
                        placeholder='Password'
                        leftIcon={{type: 'feather', name: 'lock', size: 18, color: '#d0d0d0'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputStyle={{color: 'white'}}
                        secureTextEntry
                        onChange={(e) => {
                            this.setState({password1: e.nativeEvent.text})
                        }}
                        value={this.state.password1}
                        errorMessage={this.state.error ? "Incorrect password" : null}
                    />

                    <Input
                        placeholder='Repeat password'
                        leftIcon={{type: 'feather', name: 'lock', size: 18, color: '#d0d0d0'}}
                        leftIconContainerStyle={{paddingRight: 8}}
                        inputStyle={{color: 'white'}}
                        secureTextEntry
                        onChange={(e) => {
                            this.setState({password2: e.nativeEvent.text})
                        }}
                        value={this.state.password2}
                        errorMessage={this.state.error ? "Incorrect password" : null}
                    />

                </View>

                <Button style={styles.button} onPress={() => {
                    this.setState({mode: 'login'})
                    
                }} title={"Return"}
                        color={"#40c1ac"}/>

                <Button style={styles.button} onPress={() => {
                    registerIn(this.state.login, this.state.email, this.state.password1, this.state.password2).then(
                        (res) => res ? this.props.registerIn()
                            : this.setState({login: null, email: null, password1: null,password2: null, error: true})
                    )
                }} title={"Register"}
                        color={"#40c1ac"}/>
            </ScrollView>
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
    },
    wrapper: {
        marginBottom: 8,
        width: "100%",
        maxWidth: 300,
    },
    header: {
        fontSize: 25,
        alignItems: "center",
        textAlign: "center",
        color: 'white',
        marginBottom: 10
    },
    button: {
        width: "100%",
        maxWidth: 300,
        borderWidth: 1,
        borderColor: "red",
        color: 'red'
    }
})