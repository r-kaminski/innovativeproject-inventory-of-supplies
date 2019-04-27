import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getSupply} from "../services/SuppliesService";
import {getStocktaking} from "../services/StocktakingService";


export default class StocktakingScreen extends React.Component {

    state = {
        isShowingText: true,
        stocktaking: null,
    };

    componentDidMount() {
        this.reload();
    }


    reload() {
        getStocktaking(this.props.navigation.getParam("id")).then((res) => {
            {
                this.setState({stocktaking: res})
            }
        })
    }

    static navigationOptions = {
        header: null
    };

    onPressEditStocktaking = () => {
        const {navigate} = this.props.navigation;
        navigate('StocktakingEdit', {stocktaking: this.state.stocktaking, onGoBack: () => this.reload()})
    }

    render() {
        const {stocktaking} = this.state
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {this.state.stocktaking && <View style={styles.mainView}>
                        <Text style={styles.optionsTitleText}>
                            {stocktaking.name}
                        </Text>
                        <View style={styles.row}>


                        </View>
                    </View>}

                </ScrollView>
                <Button onPress={() => this.onPressEditStocktaking()} title={"Edit"}
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
