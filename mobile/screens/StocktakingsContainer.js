import React from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { ListItem } from "react-native-elements";
import { getStocktakings } from "../services/StocktakingService";
import ReportListItem from "../components/ReportListItem";

export default class StocktakingsScreen extends React.Component {
    state = {
        pageSize: 8,
        count: 0,
        refreshing: false,
        results: [],
        page: 1,
        imgResizeRatio: 0
    };

    componentDidMount() {
        this._onRefresh(1)
        this.setState({ imgResizeRatio: Dimensions.get("window").width / 560 });
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
            page_size: this.state.pageSize
        }).then((res) => {
            {
                page === 1 ?
                    this.setState({ ...this.state, ...res, page: 1 })
                    : this.setState({ ...this.state, ...res, results: [...this.state.results, ...res.results] })

            }
        })
        .catch(err => console.log("error: ", err));
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                source={require("../assets/images/bg_header.png")}
                resizeMode="contain"
                style={{
                    position: "absolute",
                    top: 0,
                    width: 360,
                    height: 157 * this.state.imgResizeRatio,
                    flex: 1,
                    zIndex: 5
                }}
                />
                <View style={styles.headerContainer}>
                <Text>
                    <Text style={styles.headerTitle}>Reports </Text>
                    <Text style={styles.headerSubtitle}>@MAKERSPACE</Text>
                </Text>
                <Text style={styles.headerItemCount}>total of X items</Text>
                </View>
                <FlatList
                    data={this.state.results}
                    contentContainerStyle={{
                        paddingTop: 157 * this.state.imgResizeRatio
                    }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <ReportListItem
                            item={item}
                            key={index}
                            onPress={() => this._handlePressStocktaking(item.id)}
                        />
                    )}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh(1)}
                />
            </View>
        );
    }

    _handlePressStocktaking = (id) => {
        const { navigate } = this.props.nav;
        navigate('StocktakingScreen', { id: id })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      headerContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        position: "absolute",
        paddingTop: 8,
        paddingLeft: 16,
        top: 0,
        zIndex: 6
      },
      headerTitle: {
        fontFamily: "nunito-extrabold",
        fontSize: 38,
        color: "white"
      },
      headerSubtitle: {
        fontSize: 14,
        fontFamily: "nunito-extrabold",
        color: "#FFCE7B",
        paddingLeft: 6
      },
      headerItemCount: {
        fontFamily: "nunito-extralight",
        fontSize: 12,
        color: "#FFF"
      },
      listItem: {
        borderBottomWidth: 1,
        borderColor: "#d0d0d0"
      },
      subtitle: {
        color: "#d0d0d0"
      },
      overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255,0.5)",
        zIndex: 1
      }
});
