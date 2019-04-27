import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Input} from "react-native-elements";
import SuppliesContainer from "./SuppliesScreen";

export default class StocktakingsScreen extends React.Component {

    state = {
        pageSize: 8,
        isShowingText: true,
        "count": 0,
        "next": null,
        "previous": null,
        "results": [],
        "total_pages": 1,
        refreshing: false,
        search: null
    };

    onPressNavigateToNewStocktaking = () => {
        const {navigate} = this.props.navigation;
        navigate('SupplyAdd', {onRefresh: () => this._onRefresh()})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchbar}>
                    <View style={{flex: 1}}>
                        <Input style={styles.search} value={this.state.search}
                               placeholder={"Search..."}/>
                    </View>
                </View>
                <SuppliesContainer/>

                <Button onPress={() => this.onPressNavigateToNewStocktaking()} title={"Add new stocktaking"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
});
