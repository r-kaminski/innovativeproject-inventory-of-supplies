import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {clearSession, getToken, signIn} from "../services/AuthService";

export default class ButtonsRow extends React.Component {
    state = {};

    render() {

        return (
            <View key={"1"} style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button style={styles.button} onPress={() => {
                    getToken().then(console.log)
                }} title={"testuj secure store"}
                        color={"#098584"}/>
                <Button style={styles.button} onPress={() => {
                    signIn();
                }} title={"zaloguj"}
                        color={"#098584"}/>
                <Button style={styles.button} onPress={() => {
                    clearSession();
                    this.props.onPressLogout();
                }} title={"Wyloguj"}
                        color={"#098584"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginLeft: 8,
    },
});
