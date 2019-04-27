import React from 'react';
import {Button, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getStocktaking, updateStocktaking} from "../services/StocktakingService";
import {ListItem, CheckBox} from "react-native-elements";


export default class StocktakingScreen extends React.Component {

    state = {
        isShowingText: true,
        stocktaking: null,
        results: []
    };

    componentDidMount() {
        this.reload();
    }


    reload() {
        getStocktaking(this.props.navigation.getParam("id")).then((res) => {
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
            <View style={styles.container}>
                <ScrollView style={styles.container}>

                    {this.state.results.map((stocktaking, index) => {
                        return <ListItem
                            style={styles.listItem}
                            key={index}
                            title={<View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text>
                                        {stocktaking.supply.name}
                                    </Text>
                                </View>
                                <CheckBox style={{width: 20}}
                                          checked={stocktaking.is_checked}
                                          onPress={() => {
                                              const res = this.state.results
                                              res[index].is_checked = !(res[index].is_checked)
                                              updateStocktaking(this.props.navigation.getParam("id"), stocktaking.supply.id, (stocktaking.is_checked))
                                                  .then(() => {
                                                      this.setState({
                                                          ...this.state,
                                                          results: res
                                                      })
                                                  })


                                          }}
                                />

                            </View>}
                            subtitle={
                                <Text style={styles.subtitle}
                                      ellipsizeMode={'tail'}
                                      numberOfLines={1}
                                >{stocktaking.supply.description}</Text>
                            }
                            onPress={() => {
                                const res = this.state.results
                                res[index].is_checked = !(res[index].is_checked)
                               updateStocktaking(this.props.navigation.getParam("id"), stocktaking.supply.id , (stocktaking.is_checked))
                                                  .then(() => {
                                                      this.setState({
                                                          ...this.state,
                                                          results: res
                                                      })
                                                  })
                            }}
                        />
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchbar: {
        flexDirection: 'row',
    },
    search: {
        maxWidth: 40
    }
});
