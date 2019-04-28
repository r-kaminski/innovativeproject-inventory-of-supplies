import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {postStocktaking} from "../services/StocktakingService";
import {Button, Input} from "react-native-elements";


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
                <Button onPress={() => this.onPressAddStocktaking()} title={"Save"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>
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
