import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import {postSupply} from "../services/SuppliesService";


export default class SupplyEdit extends React.Component {

    state = {
        isShowingText: true,
        supply: {
            name: "",
            state: "",
            description: ""
        }
    };


    static navigationOptions = {
        header: null,
        tabBarVisible: false
    };

    onPressSave = () => {
        const {goBack} = this.props.navigation;
        const newSupply = {
            name: this.state.supply.name,
            state: this.state.supply.state,
            description: this.state.supply.description
        }
        postSupply(newSupply)
            .then(() => this.props.navigation.state.params.onRefresh())
        goBack()
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
                        <Input inputStyle={styles.optionsTitleText}
                               onChange={(e) => {
                                   this.setState({supply: {...supply, name: e.nativeEvent.text}})
                               }}
                               value={supply.name}
                               label={"Name"}
                        />
                        <View style={styles.row}>
                            <View style={{flex: 1}}>

                                <Input inputStyle={styles.optionText}
                                       onChange={(e) => {
                                           this.setState({supply: {...supply, state: e.nativeEvent.text}})
                                       }}
                                       value={supply.state}
                                       label={"State"}
                                />
                                <Input inputStyle={styles.optionText}
                                       onChange={(e) => {
                                           this.setState({supply: {...supply, description: e.nativeEvent.text}})
                                       }}
                                       value={supply.description}
                                       label={"Description"}
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
    }
});
