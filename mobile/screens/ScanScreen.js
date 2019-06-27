import React from 'react';
import { BarCodeScanner, Permissions } from 'expo';
import { Dimensions, LayoutAnimation, StatusBar, StyleSheet, Text, View, ToastAndroid, TouchableOpacity, BackHandler } from 'react-native';
import { Button, Icon } from "react-native-elements";
import { updateStocktaking } from '../services/StocktakingService';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';
import Colors from "../constants/Colors";


export default class ScanScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        stocktaking: null,
        supplyId: null,
        backScreen: null,
    };

    constructor(props) {
        super(props);
        if (typeof this.props.navigation.getParam("stockId") !== 'undefined') {
            this.state.stocktaking = this.props.navigation.getParam("stockId");
        }
    }

    componentDidMount() {
        this._requestCameraPermission();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
        this.setState({
            prevScreen: this.props.navigation.getParam('origin', null)
        });
    }

    componentWillUnmount(){
        this.backHandler.remove();
    }

    _requestCameraPermission = () => {
        Permissions.askAsync(Permissions.CAMERA).then((res) => {
            this.setState({
                hasCameraPermission: res.status === 'granted',
            })
        })

    };

    _handleBarCodeRead = async result => {
        let id = parseInt(result.data);
        if (isNaN(id)) {
            return;
        }
        if (id !== this.state.supplyId) {
            LayoutAnimation.spring();
            this.setState({ supplyId: id })
            if (this.state.stocktaking !== null) {
                try {
                    await updateStocktaking(this.state.stocktaking, id, true);
                    ToastAndroid.show(`Scanned supply: ${id}`, ToastAndroid.SHORT);
                } catch {
                    ToastAndroid.show(`Error while scanning`, ToastAndroid.SHORT);
                }
            } else {
                this.props.navigation.navigate('Supply', { id: id })
            }
        }
    };

    _handleBackButton = () => {
        this.goBack();
        return true;
    }

    goBack = async () => {
        this.props.navigation.navigate(this.state.prevScreen);
    }

    static navigationOptions = {
        header: null
      };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                borderColor: 'red',
                borderWidth: 1
            }}>
                {this.state.hasCameraPermission === null
                    ? <View style={styles.container}>
                        <Text>Requesting for camera permission</Text>
                    </View>
                    : this.state.hasCameraPermission === false
                        ? <View style={styles.container}>
                            <Text style={{ marginBottom: 10 }}>
                                Camera permission is not granted
                            </Text>
                            <Button title={"Get permissions to camera"} onPress={() => {
                                this._requestCameraPermission()
                            }} />

                        </View>
                        : <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{
                                height: Dimensions.get('window').height,
                                width: Dimensions.get('window').width,
                            }}
                        />}
                <StatusBar hidden />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={this.goBack}
                >
                    <Icon type="material" name="clear" color={Colors.primaryColor} />
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: "absolute",
        bottom: 16,
        end: 16,
        width: 52,
        height: 52,
        backgroundColor: "#FFF",
        elevation: 2,
        zIndex: 5,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center"
    }
});
