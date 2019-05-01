import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getSupplies} from "../services/SuppliesService";
import {ListItem} from "react-native-elements";

export default class SuppliesContainer extends React.Component {

    state = {
        pageSize: 8,
        "count": 0,
        "results": [],
        refreshing: false,
        page: 1
    };


    componentDidMount() {
        this._onRefresh(1)
    }

    _onRefresh = (page) => {
        this.setState({refreshing: true, page: page ? page : 1});
        this.fetchData(page ? page : 1).then(() => {
            this.setState({refreshing: false});
        });
    }

    async fetchData(page) {
        await getSupplies({page: page, page_size: this.state.pageSize, name: this.props.search}).then((res) => {
            {
                console.log("page: ", page, this.props.search, res.total_pages) //TODO coś jest nie tak z searchem
                page === 1 ?
                    this.setState({...this.state, ...res, page: 1})
                    : this.setState({...this.state, ...res, results: [...this.state.results, ...res.results]})
            }
        }).catch((err) => console.log("error: ", err))
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.results}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => <ListItem
                        style={styles.listItem}
                        key={index}
                        leftAvatar={{source: {uri: 'https://via.placeholder.com/150'}}}
                        title={item.name}
                        subtitle={
                            <Text style={styles.subtitle}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={1}
                            >{item.description}</Text>
                        }

                        onPress={() => this._handlePressTool(item.id)}
                    />

                    }
                    onEndReached={() => {
                        if (this.state.page < this.state.count / this.state.pageSize) {
                            this._onRefresh(this.state.page + 1);
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={this.state.pageSize}
                />
            </View>
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
    },
    listItem: {
        borderBottomWidth: 1,
        borderColor: '#d0d0d0'
    },
    subtitle: {
        color: '#d0d0d0',

    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.5)',
        zIndex: 1
    }
});
