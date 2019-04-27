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
        // "results": [],
        "total_pages": 1,
        refreshing: false,
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
                        onScroll={({nativeEvent}) => {
                            if (this.isCloseToBottom(nativeEvent)) {
                                this._onRefresh(Math.floor(this.state.count / this.state.pageSize) + 1);
                            }
                        }}
            >

                {this.props.results.map((stocktaking, index) => {
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
