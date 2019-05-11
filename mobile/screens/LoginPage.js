import React from 'react';
import {StyleSheet, Text, TextInput, View, Image, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { signIn } from "../services/AuthService";
import GradientButton from 'react-native-gradient-buttons';
import { ScrollView } from 'react-native-gesture-handler';


export default class LoginPage extends React.Component {
    constructor(props){
        super(props);

        this.passwordInput = React.createRef();
        //this.signIn = this.signIn.bind(this);
    }

    state = {
        login: null,
        password: null,
        error: null
    }


    signIn = () => {
        signIn(this.state.login, this.state.password).then(
            (res) => res ? this.props.onSignInSuccess()
                : this.setState({login: null, password: null, error: true})
        )
    };

    render() {
        return (
            <ImageBackground source={require('../assets/images/bg_login.png')} style={styles.background}>
            {/* i dont know what this thing does, so i leave it alone
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", justifyContent: "center"}}
                        keyboardShouldPersistTaps='handled'
            > */}
                <KeyboardAvoidingView 
                        behavior="padding"
                        style={styles.wrapper}
                        enabled>        
                <ScrollView contentContainerStyle={styles.wrapper}
                    keyboardShouldPersistTaps='handled'>            

                    <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
                    <Text style={styles.title}>MAKERSPACE</Text>
                    <Text style={styles.subtitle}>Manage supplies. Conquer space.</Text>

                    <TextInput
                        placeholder='Login'
                        style={styles.input}
                        underlineColorAndroid="transparent"

                        value={this.state.login}
                        onChangeText={(text) => this.setState({login: text})}

                        autoFocus={true}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={()=> this.passwordInput.current.focus()}
                    />

                    <TextInput
                        secureTextEntry
                        ref={this.passwordInput}
                        placeholder='Password'

                        underlineColorAndroid="transparent"
                        style={styles.input}
                        
                        value={this.state.password}
                        onChangeText={(text) => this.setState({password: text})}
                        onSubmitEditing={this.signIn}
                        errorMessage={this.state.error ? "Wrong login or password" : null}
                    />

                    <GradientButton 
                        style={styles.button} 
                        onPressAction={this.signIn} 
                        text={"Sign in"}
                        textStyle={{fontSize: 14}}
                        gradientBegin={"#C570AE"}
                        gradientEnd={"#9F6AAD"}
                        gradientDirection={"vertical"}/>
                
                </ScrollView>
                </KeyboardAvoidingView>

            </ImageBackground>
        )

    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    wrapper: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
    },
    logo: {
        width: 130,
        height: 130,
    },
    title: {
        fontSize: 36,
        color: '#C570AE',
        marginBottom: -10,
    },
    subtitle: {
        fontSize: 15,
        color: '#C570AE',
        marginBottom: 40,
    },
    input: {
        color: 'black',
        fontSize: 14,
        backgroundColor: '#FFF',
        height: 50,
        width: 250,
        borderRadius: 25,
        borderColor: "#FFF",
        borderWidth: 0,
        paddingLeft: 36,
        marginBottom: 18,

        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 6,
        elevation: 3,
    },
    button: {
        color: 'white',
        fontSize: 14,
        height: 50,
        width: 250,
        borderRadius: 25,
        borderColor: "#FFF",
        borderWidth: 0,

        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 6,
        elevation: 3,
    }
})