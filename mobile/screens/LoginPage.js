import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {signIn} from "../services/AuthService";
import {Input} from "react-native-elements";

export default class LoginPage extends React.Component {
    state = {
        login: null,
        password: null,
        error: null
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", justifyContent: "center"}}
                        keyboardShouldPersistTaps='handled'
            >
                <View style={styles.wrapper}>
                    <Text style={styles.header}>STOCK</Text>
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
                            this.setState({password: e.nativeEvent.text})
                        }}
                        value={this.state.password}
                        errorMessage={this.state.error ? "Wrong login or password" : null}
                    />

                </View>

                <Button style={styles.button} onPress={() => {
                    signIn(this.state.login, this.state.password).then(
                        (res) => res ? this.props.signIn()
                            : this.setState({login: null, password: null, error: true})
                    )
                }} title={"Log in"}
                        color={"#40c1ac"}/>
            </ScrollView>
        )
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