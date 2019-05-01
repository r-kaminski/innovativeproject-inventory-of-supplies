import React from 'react';
import { BarCodeScanner, Permissions } from 'expo';
import { Dimensions, LayoutAnimation, StatusBar, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Button } from "react-native-elements";
import { checkSupply } from '../services/StocktakingsService';


export default class ScanScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        stocktaking: null,
        supplyId: null,
    };

    constructor(props) {
        super(props);
        if (typeof this.props.navigation.getParam("stockId") !== 'undefined') {
            this.state.stocktaking = this.props.navigation.getParam("stockId");
        }
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = () => {
        Permissions.askAsync(Permissions.CAMERA).then((res) => {
            this.setState({
                hasCameraPermission: res.status === 'granted',
            })
        })

    };

    _handleBarCodeRead = async result => {
        if (result.data !== this.state.supplyId) {
            LayoutAnimation.spring();
            this.setState({ supplyId: result.data })
            if (this.state.stocktaking !== null) {
                try {
                    await checkSupply(this.state.stocktaking, result.data);
                    ToastAndroid.show(`Scanned supply: ${result.data}`, ToastAndroid.SHORT);
                } catch {
                    ToastAndroid.show(`Error while scanning`, ToastAndroid.SHORT);
                }

            } else {
                this.props.navigation.navigate('Supply', { id: result.data })
            }
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
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
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
