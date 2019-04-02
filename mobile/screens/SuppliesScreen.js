import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {getSupplies} from "../services/SuppliesService";
import {Button, ListItem} from "react-native-elements";

export default class SuppliesScreen extends React.Component {

    state = {
        isShowingText: true,
        "count": 0,
        "next": null,
        "previous": null,
        "results": [],
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
        header: null
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
                    return <ListItem
                        style={styles.listItem}
                        key={index}
                        leftAvatar={{source: {uri: 'https://via.placeholder.com/150'}}}
                        title={supply.name}
                        subtitle={supply.description}
                        onPress={() => this._handlePressTool(supply.id)}
                    />
                })}

                <Button onPress={() => this.onPressNavigateToAddNewSupply()} title={"Dodaj nowe narządzie"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>

            </ScrollView>
        );
    }

    onPressNavigateToAddNewSupply = () => {
        const {navigate} = this.props.navigation;
        navigate('SupplyAdd', {onRefresh: () => this._onRefresh()})
    }

    _handlePressTool = (id) => {
        const {navigate} = this.props.navigation;
        navigate('Supply', {id: id})
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1,
    },
    listItem: {
        borderBottomWidth: 1,
        borderColor: '#d0d0d0'
    }
});
