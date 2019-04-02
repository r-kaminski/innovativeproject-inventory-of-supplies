import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {getSupplies, postSupply} from "../services/SuppliesService";
import {Button} from "react-native-elements";


export default class LinksScreen extends React.Component {

    state = {
        isShowingText: true,
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "description": "to jest opis narzedzia",
                "id": 1,
                "name": "mlotek",
                "state": "deaeaq",
            },
        ],
        "total_pages": 1,
        refreshing: false,
    };

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData().then(() => {
            this.setState({refreshing: false});
        });
    }

    async fetchData() {
        await getSupplies({page: 1, page_size: 10}).then((res) => {
            {
                this.setState(res)
            }
        })
    }


    static navigationOptions = {
        title: 'Narzędzia',
    };

    render() {
        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
            >

                {this.state.results.map((supply, index) => {
                    return <Touchable
                        key={supply.id ? supply.id : supply.name + index}
                        style={styles.option}
                        background={Touchable.Ripple('#ccc', false)}
                        onPress={() => this._handlePressTool(supply.id)}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>
                                    {supply.name}
                                </Text>
                            </View>
                        </View>
                    </Touchable>
                })}

                <Button onPress={() => this.onPressNavigateToAddNewSupply()} title={"Dodaj nowy pokój"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>

            </ScrollView>
        );
    }

    onPressNavigateToAddNewSupply = () => {
        postSupply({name: "Szuflada", state: "dobry", description: "opisik"})
            .then(() => this._onRefresh())
    }

    _handlePressTool = (id) => {
        const {navigate} = this.props.navigation;
        navigate('Tool', {id: id})
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1,
    },
    optionsTitleText: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 12,
    },
    optionIconContainer: {
        marginRight: 9,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomColor: '#EDEDED',
    },
    optionText: {
        fontSize: 15,
        marginTop: 1,
    },
});
