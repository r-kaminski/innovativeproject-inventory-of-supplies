import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getSupply, postSupply} from "../services/SuppliesService";
import {getStocktaking, postStocktaking} from "../services/StocktakingService";
import {Input} from "react-native-elements";


export default class StocktakingAdd extends React.Component {

    state = {
        isShowingText: true,
        stocktaking: {
            name: "",
            date: ""
        },
    };


    static navigationOptions = {
        header: null
    };

    onPressAddStocktaking = () => {
        const {goBack} = this.props.navigation;
        const newStocktaking = {
            name: this.state.stocktaking.name,
        }
        postStocktaking(newStocktaking)
            .then(() => this.props.navigation.state.params.onRefresh())
        goBack()
    }

    render() {
        const {stocktaking} = this.state;
        return (
            <View style={styles.container}>

                <ScrollView style={styles.container}>
                    {this.state.stocktaking && <View style={styles.mainView}>
                        <Text style={styles.optionsTitleText}>
                            {stocktaking.name}
                        </Text>
                        <Input inputStyle={styles.optionsTitleText}
                               onChange={(e) => {
                                   this.setState({stocktaking: {...stocktaking, name: e.nativeEvent.text}})
                               }}
                               value={stocktaking.name}
                               label={"Name"}
                        />

                        <View style={styles.row}>


                        </View>
                    </View>}

                </ScrollView>
                <Button onPress={() => this.onPressAddStocktaking()} title={"Add"}
                        color={"#098584"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchbar: {
        flexDirection: 'row',
    },
    search: {
        maxWidth: 40
    }
});
