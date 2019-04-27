import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {ListItem} from "react-native-elements";
import {getStocktakings} from "../services/StocktakingService";

export default class StocktakingsScreen extends React.Component {
    state = {
        pageSize: 8,
        isShowingText: true,
        "count": 0,
        "next": null,
        "previous": null,
        "total_pages": 1,
        refreshing: false,
        results: []
    };

        componentDidMount() {
        this._onRefresh(1)
    }

    _onRefresh = (page) => {
        this.setState({refreshing: true});
            this.setState({refreshing: true});
        this.fetchData(page ? page : 1).then(() => {
            this.setState({refreshing: false});
        });
    }

            async fetchData(page) {
                await getStocktakings({page: page, page_size: this.state.pageSize}).then((res) => {
                    {
                        this.setState(res)
                    }
                })
            }

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        return layoutMeasurement.height + contentOffset.y
            >= contentSize.height - 50;
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
                        onScroll={({nativeEvent}) => {
                            if (this.isCloseToBottom(nativeEvent)) {
                                this._onRefresh(Math.floor(this.state.count / this.state.pageSize) + 1);
                            }
                        }}
            >

                {this.state.results.map((stocktaking, index) => {
                    return <ListItem
                        style={styles.listItem}
                        key={index}
                        title={stocktaking.name}
                        subtitle={
                            <Text style={styles.subtitle}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={1}
                            >{stocktaking.date}</Text>
                        }
                        onPress={() => this._handlePressStocktaking(stocktaking.id)}
                    />
                })}
            </ScrollView>
        );
    }

    _handlePressStocktaking = (id) => {
        const {navigate} = this.props.nav;
        navigate('StocktakingScreen', {id: id})
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
