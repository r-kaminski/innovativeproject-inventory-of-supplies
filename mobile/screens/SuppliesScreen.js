import React from 'react';
import {StyleSheet, View} from 'react-native';
import SuppliesContainer from "./SuppliesContainer";
import {Button, Icon, Input} from "react-native-elements";

export default class SuppliesScreen extends React.Component {

    // state = {
    //     pageSize: 8,
    //     isShowingText: true,
    //     "count": 0,
    //     "next": null,
    //     "previous": null,
    //     "results": [],
    //     "total_pages": 1,
    //     refreshing: false,
    // };


    static navigationOptions = {
        header: null
    };

    onPressNavigateToAddNewSupply = () => {
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
                    <View style={{width: 30, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            name="qrcode"
                            type='font-awesome'
                            size={25}
                            color="black"
                            onPress={() => {
                                this.props.navigation.navigate('Scanner')
                            }}
                        />

                    </View>
                </View>
                <SuppliesContainer onPressTool={id => this.props.navigation.navigate('Supply', { id: id })} />

                <Button onPress={() => this.onPressNavigateToAddNewSupply()} title={"Add new supply"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchbar: {
        flexDirection: 'row',
    },
    search: {
        maxWidth: 40
    }
});
