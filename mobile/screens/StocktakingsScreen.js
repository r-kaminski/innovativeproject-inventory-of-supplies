import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from "react-native-elements";
import StocktakingsContainer from "./StocktakingsContainer";

export default class StocktakingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    state = {
        "search": ""
    };

    _onRefresh = () => {
        this.child.current._onRefresh(1);
    }

    onPressNavigateToNewStocktaking = () => {
        const { navigate } = this.props.navigation;
        navigate('StocktakingAdd', { onRefresh: () => this._onRefresh() })
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchbar}>
                    <View style={{ flex: 1 }}>
                        <Input style={styles.search} value={this.state.search}
                            placeholder={"Search..."} onChange={(value) => {
                                this.setState({ search: value.nativeEvent.text });
                                this.child.current._onRefresh(1);
                            }} />
                    </View>
                </View>
                <StocktakingsContainer nav={this.props.navigation} search={this.state.search} ref={this.child} />

                <Button onPress={() => this.onPressNavigateToNewStocktaking()} title={"Add new stocktaking"}
                    buttonStyle={{ backgroundColor: "#40c1ac" }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        maxHeight: "100%"
    },
    searchbar: {
        flexDirection: 'row',
    },
    search: {
        maxWidth: 40
    }
});
