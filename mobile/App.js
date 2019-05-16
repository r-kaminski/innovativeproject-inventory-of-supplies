import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import LoginPage from "./screens/LoginPage";
import { autoLogin } from "./services/AuthService";
import ButtonsRow from "./components/ButtonsRow";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    signedIn: false,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "nunito-black": require("./assets/fonts/Nunito-Black.ttf"),
      "nunito-extralight": require("./assets/fonts/Nunito-ExtraLight.ttf"),
      "nunito-extrabold": require("./assets/fonts/Nunito-ExtraBold.ttf"),
      "alegreya-sans-medium": require("./assets/fonts/AlegreyaSans-Medium.ttf")
    });

    this.setState({ fontLoaded: true });
    autoLogin().then(res => {
      this.setState({ signedIn: res });
    });
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
            {this.state.fontLoaded ? (
              this.state.signedIn ? (
                [
                  <ButtonsRow onPressLogout={this.logout} key={"1"} />,
                  <AppNavigator style={styles.appNavigator} key={"2"} />
                ]
              ) : (
                <LoginPage onSignInSuccess={this.onSignInSuccess} />
              )
            ) : null}
          </View>
        </View>
      );
    }
  }

  logout = () => {
    this.setState({ signedIn: false });
  };

  onSignInSuccess = () => {
    console.log("onSignInSuccess");
    this.setState({
      signedIn: true
    });
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  appContainer: {
    // marginTop: 20,
    backgroundColor: "#00295c",
    flex: 1
  },
  container: {
    marginTop: 20,
    flex: 1
  },
  appNavigator: {
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "green",
    padding: 10,
    margin: 10
  }
});
