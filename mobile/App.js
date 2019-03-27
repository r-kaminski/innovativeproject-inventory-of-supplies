import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {LoginPage} from "./screens/LoginPage";
import {autoLogin, clearSession} from "./services/AuthService";
import ButtonsRow from "./components/ButtonsRow";

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        signedIn: false,
        name: "",
        photoUrl: ""
    };

    componentDidMount() {
        autoLogin().then((res) => {
                this.setState({signedIn: res})

            }
        )
    }


    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    {this.state.signedIn ? (
                            [<ButtonsRow onPressLogout={this.logout} key={"1"}/>,
                                <AppNavigator key={"2"}/>]
                        )
                        : (
                            <LoginPage signIn={this.onPressSignIn}/>
                        )}
                </View>
            );
        }
    }

    logout = () => {
        this.setState({signedIn: false})
    };

    onPressSignIn = () => {
        //logowanie google
        // signIn().then((result) => {
        //         if (result.type === "success") {
        //             this.setState({
        //                 signedIn: true,
        //                 name: result.user.name,
        //                 photoUrl: result.user.photoUrl
        //             })
        //         } else {
        //             console.log("cancelled")
        //         }
        //     }
        // )
        this.setState({
            signedIn: true,
        })
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
});
