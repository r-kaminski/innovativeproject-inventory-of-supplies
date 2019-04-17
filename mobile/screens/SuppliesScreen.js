import React from 'react';
import {StyleSheet, View} from 'react-native';
import SuppliesContainer from "./SuppliesContainer";
import {Icon, Input} from "react-native-elements";

export default class SuppliesScreen extends React.Component {

    state = {
        pageSize: 8,
        isShowingText: true,
        "count": 0,
        "next": null,
        "previous": null,
        "results": [],
        "total_pages": 1,
        refreshing: false,
    };


    static navigationOptions = {
        header: null
    };

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
                            onPress={() => console.log("click")}
                        />

                    </View>
                </View>
                <SuppliesContainer/>
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
    searchbar: {
        flexDirection: 'row',
    },
    search: {
        maxWidth: 40
    }
});
