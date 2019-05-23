import React from 'react';
// import  {CameraRoll, Modal, TouchableHighlight, Text, Alert, PermissionsAndroid} from "react-native";
import {
    Alert,
    CameraRoll,
    Image,
    Modal,
    PermissionsAndroid,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import {Button, Icon, Input} from "react-native-elements";
import {updateSupply} from "../services/SuppliesService";

async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message:
                    'App needs access to your camera ' +
                    'so you can take pictures of supplies.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        console.warn(err);
    }


    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Access Storage',
                'message': 'Access Storage for the pictures'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use read from the storage")
        } else {
            console.log("Storage permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}

export default class SupplyEdit extends React.Component {

    state = {
        isShowingText: true,
        supply: this.props.navigation.getParam("supply"),
        modalVisible: false,
    };

    // supply.image =  {
    //   "node": Object {
    //     "group_name": "Camera",
    //     "image": Object {
    //       "height": 3120,
    //       "uri": "content://media/external/images/media/88966",
    //       "width": 4160,
    //     },
    //     "location": Object {
    //       "latitude": 51.11796144,
    //       "longitude": 17.09299882,
    //     },
    //     "timestamp": 1558174895.197,
    //     "type": "image/jpeg",
    //   },
    // },


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    static navigationOptions = {
        header: null
    };

    onPressSave = () => {
        const {goBack} = this.props.navigation;
        this.props.navigation.state.params.onGoBack();
        const newSupply = {
            name: this.state.supply.name,
            state: this.state.supply.state,
            description: this.state.supply.description
        }
        updateSupply(this.state.supply.id, newSupply)
        goBack()
    }

    _handleCameraButtonPress = async () => {
        console.log("_handleCameraButtonPress")
        requestCameraPermission().then(
            () =>
                CameraRoll.getPhotos({
                    first: 20,
                    // assetType: 'Photos',
                })
                    .then(r => {
                        console.log("r: ", r, r.edges)
                        this.setState({photos: r.edges});
                    })
                    .catch((err) => {
                        console.log("error: ", err)
                        //Error Loading Images
                    })
        )


    };





    render() {
        const {supply} = this.state
        return (
            <View style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View>
                        <View style={styles.modalHeader}>
                            <Text>Select photo</Text>
                            <Button title={"Take a photo"} onPress={() => console.log("take a photo")}/>
                            <Icon
                                name="close"
                                type='font-awesome'
                                size={18}
                                color="black"
                                onPress={() => {
                                    console.log("close")
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            />
                        </View>
                        <View>
                            {this.state.photos && <ScrollView>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}>
                                    {this.state.photos.map((p, i) => {
                                        return (
                                            <TouchableHighlight key={i}
                                                                onPress={() => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        supply: {
                                                                            ...this.state.supply,
                                                                            image: this.state.photos[i]
                                                                        }
                                                                    })
                                                                    this.setModalVisible(false)
                                                                }
                                                                }>
                                                <Image

                                                    style={{width: 150, height: 150, margin: 4}}
                                                    source={{uri: p.node.image.uri}}

                                                />
                                            </TouchableHighlight>
                                        );
                                    })}
                                </View>
                            </ScrollView>}
                        </View>
                    </View>
                </Modal>


                <ScrollView style={styles.container}>
                    {this.state.supply && <View style={styles.mainView}>
                        <View style={styles.firstBlock}>
                            <View style={styles.imageContainer}>
                            <Image
                                source={{uri: this.state.supply.image ? this.state.supply.image.node.image.uri : 'https://via.placeholder.com/150'}}
                                resizeMode="contain"
                                fadeDuration={0}
                                style={styles.image}
                            />
                            </View>
                            <Icon
                                name="camera"
                                type='font-awesome'
                                size={20}
                                color="black"
                                onPress={() => {
                                    console.log("kliknięto")
                                    this.setModalVisible(true);
                                    this._handleCameraButtonPress();
                                }}
                            />
                        </View>
                        <Input inputStyle={styles.optionsTitleText}
                               onChange={(e) => {
                                   this.setState({supply: {...supply, name: e.nativeEvent.text}})
                               }}
                               value={supply.name}
                               label={"Name:"}
                        />
                        <View style={styles.row}>
                            <View style={{flex: 1}}>

                                <Input inputStyle={styles.optionText}
                                       value={supply.id.toString()}
                                       label={"Id:"}
                                       editable={false}
                                />

                                <Input inputStyle={styles.optionText}
                                       onChange={(e) => {
                                           this.setState({supply: {...supply, state: e.nativeEvent.text}})
                                       }}
                                       value={supply.state}
                                       label={"State:"}
                                />
                                <Input inputStyle={styles.optionText}
                                       onChange={(e) => {
                                           this.setState({supply: {...supply, description: e.nativeEvent.text}})
                                       }}
                                       value={supply.description}
                                       label={"Description:"}
                                />
                            </View>


                        </View>
                    </View>}

                </ScrollView>
                <Button onPress={() => this.onPressSave()} title={"Save"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        paddingRight: 20,
        paddingLeft: 20
    },
    firstBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        maxHeight: "100%"
    },
    optionsTitleText: {
        fontSize: 18,
        // marginBottom: 12,
    },
    optionText: {
        fontSize: 15,
        marginTop: 1,
    },
    descriptionText: {
        fontSize: 15,
        marginTop: 1,
        color: '#808080'
    },
    row: {
        flexDirection: 'row',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    }
});
