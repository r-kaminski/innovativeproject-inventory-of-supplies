import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppLoading, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginPage from "./screens/LoginPage";
import {autoLogin} from "./services/AuthService";
import ButtonsRow from "./components/ButtonsRow";

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        signedIn: false,
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
                <View style={styles.appContainer}>
                    <View style={styles.container}>
                        {this.state.signedIn ? (
                                [<ButtonsRow onPressLogout={this.logout} key={"1"}/>,
                                    <AppNavigator key={"2"}/>]
                            )
                            : (
                                <LoginPage signIn={this.onPressSignIn}/>
                            )}
                    </View>
                </View>
            );
        }
    }

    logout = () => {
        this.setState({signedIn: false})
    };

    onPressSignIn = () => {
        this.setState({
            signedIn: true,
        })
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
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
    appContainer: {
        // marginTop: 20,
        backgroundColor: "#00295c",
        flex: 1,
    },
    container: {
        marginTop: 20,
        flex: 1,
        //backgroundColor: "#00295c",
    },
});
