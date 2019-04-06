import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {signIn} from "../services/AuthService";

export const LoginPage = props => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
        },
        header: {
            fontSize: 25
        },
        image: {
            marginTop: 15,
            width: 150,
            height: 150,
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 3,
            borderRadius: 150
        }
    })

    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button title="Sign in with Google"
                    onPress={() => props.signIn()}/>

            <Button style={styles.button} onPress={() => {
                signIn();
                props.signIn();
            }} title={"zaloguj"}
                    color={"#098584"}/>
        </View>
    )
}

