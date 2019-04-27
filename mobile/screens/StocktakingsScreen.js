import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';
import { ListItem } from "react-native-elements";
import { getStocktakings } from '../services/StocktakingsService';

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
    };

    _onRefresh = (page) => {
        this.state.count >= 0 ?
            this.fetchData(page).then(() => {
                this.setState({ refreshing: false });
            })
            :
            this.setState({ refreshing: true });
        this.fetchData(page ? page : 1).then(() => {
            this.setState({ refreshing: false });
        });
    }

    componentDidMount() {
        this._onRefresh(1)
    }

    async fetchData(page) {
        await getStocktakings({ page: page, page_size: this.state.pageSize }).then((res) => {
            {
                this.setState(res)
            }
        });
        console.log(this.state);
    }


    static navigationOptions = {
        header: null
    };

    _handlePressTool(id) {

    }

    render() {
        return (
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                onScroll={({ nativeEvent }) => {
                    if (this.isCloseToBottom(nativeEvent)) {
                        this._onRefresh(Math.floor(this.state.count / this.state.pageSize) + 1);
                    }
                }}
            >

                {this.state.results.map((stocktaking, index) => {
                    return <ListItem
                        style={styles.listItem}
                        key={index}
                        // leftAvatar={{ source: { uri: 'https://via.placeholder.com/150' } }}
                        title={stocktaking.name}
                        subtitle={
                            <Text style={styles.subtitle}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                            >{stocktaking.date}</Text>
                        }
                        onPress={() => this._handlePressTool(stocktaking.id)}
                    />
                })}
            </ScrollView>
        );
    }

    _handlePressTool = (id) => {
        const { push } = this.props.navigation;
        push('StockScanner', { stockId: id })
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
    },
    subtitle: {
        color: '#d0d0d0',
    }
});
