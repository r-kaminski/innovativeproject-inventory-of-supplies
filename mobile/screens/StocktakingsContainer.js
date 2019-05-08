import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { ListItem } from "react-native-elements";
import { getStocktakings } from "../services/StocktakingService";

export default class StocktakingsScreen extends React.Component {
    state = {
        pageSize: 8,
        "count": 0,
        refreshing: false,
        results: [],
        page: 1
    };

    componentDidMount() {
        this._onRefresh(1)
    }

    _onRefresh = (page) => {
        this.setState({ refreshing: true, page: page ? page : 1 });
        this.fetchData(page ? page : 1).then(() => {
            this.setState({ refreshing: false });
        });
    }

    async fetchData(page) {
        await getStocktakings({
            page: page,
            page_size: this.state.pageSize,
            name: this.props.search
        }).then((res) => {
            {
                page === 1 ?
                    this.setState({ ...this.state, ...res, page: 1 })
                    : this.setState({ ...this.state, ...res, results: [...this.state.results, ...res.results] })

            }
        })
    }


    render() {
        return (
            <FlatList style={styles.container}
                data={this.state.results}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => <ListItem
                    style={styles.listItem}
                    key={index}
                    title={item.name}
                    subtitle={
                        <Text style={styles.subtitle}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                        >{item.date}</Text>
                    }
                    onPress={() => this._handlePressStocktaking(item.id)}
                />}
                refreshing={this.state.refreshing}
                onRefresh={() => this._onRefresh(1)}
            />
        );
    }

    _handlePressStocktaking = (id) => {
        const { navigate } = this.props.nav;
        navigate('StocktakingScreen', { id: id })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    listItem: {
        borderBottomWidth: 1,
        borderColor: '#d0d0d0'
    },
    subtitle: {
        color: '#d0d0d0',

    },
});
