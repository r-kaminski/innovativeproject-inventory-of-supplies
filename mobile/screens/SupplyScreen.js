import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getSupply} from "../services/SuppliesService";
import {Button} from "react-native-elements";


export default class SupplyScreen extends React.Component {

    state = {
        isShowingText: true,
        supply: null
    };

    componentDidMount() {
        this.reload();
    }


    reload() {
        getSupply(this.props.navigation.getParam("id")).then((res) => {
            {
                this.setState({supply: res})
            }
        })
    }

    static navigationOptions = {
        header: null
    };

    onPressEditTool = () => {
        const {navigate} = this.props.navigation;
        navigate('SupplyEdit', {supply: this.state.supply, onGoBack: () => this.reload()})
    }

    render() {
        const {supply} = this.state
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {this.state.supply && <View style={styles.mainView}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                resizeMode="contain"
                                fadeDuration={0}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.descriptionText}>
                            Name:
                        </Text>
                        <Text style={styles.optionsTitleText}>
                            {supply.name}
                        </Text>
                        <View style={styles.row}>

                            <View style={{paddingRight: 8}}>
                                <Text style={styles.descriptionText}>
                                    Id:
                                </Text>
                                <Text style={styles.optionText}>
                                    {supply.id}
                                </Text>

                                <Text style={styles.descriptionText}>
                                    State:
                                </Text>
                                <Text style={styles.optionText}>
                                    {supply.state}
                                </Text>

                                <Text style={styles.descriptionText}>
                                    Description:
                                </Text>
                                <Text style={styles.optionText}>
                                    {supply.description}
                                </Text>
                                <Text style={styles.descriptionText}>
                                    {supply.localization}
                                </Text>
                                <Text style={styles.optionText}>
                                    {supply.localization}
                                </Text>
                            </View>


                        </View>
                    </View>}

                </ScrollView>
                <Button onPress={() => this.onPressEditTool()} title={"Edit"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        paddingRight: 20,
        paddingLeft: 20,
        maxWidth: "100%"
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
        maxHeight: "100%",
        maxWidth: "100%",
    },
    optionsTitleText: {
        fontSize: 18,
        marginBottom: 12,
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
        display: "flex",
        flexDirection: 'row',
        maxWidth: "100%"
    }
});
