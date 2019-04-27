import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';
import { getSupplies } from "../services/SuppliesService";
import { ListItem } from "react-native-elements";

export default class SuppliesContainer extends React.Component {

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


    componentDidMount() {
        this._onRefresh(1)
    }

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

    async fetchData(page) {
        await getSupplies({ page: page, page_size: this.state.pageSize }).then((res) => {
            {
                this.setState(res)
            }
        })
    }


    static navigationOptions = {
        header: null
    };

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

                {this.state.results.map((supply, index) => {
                    return <ListItem
                        style={styles.listItem}
                        key={index}
                        leftAvatar={{ source: { uri: 'https://via.placeholder.com/150' } }}
                        title={supply.name}
                        subtitle={
                            <Text style={styles.subtitle}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                            >{supply.description}</Text>
                        }

                        onPress={() => this._handlePressTool(supply.id)}
                    />
                })}
            </ScrollView>
        );
    }

    _handlePressTool = (id) => {
        const {navigate} = this.props.nav;

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
    },
    subtitle: {
        color: '#d0d0d0',

    }
});
