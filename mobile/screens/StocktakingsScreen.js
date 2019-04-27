import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Input} from "react-native-elements";
import StocktakingsContainer from "./StocktakingsContainer";
import {getStocktakings} from "../services/StocktakingService";

export default class StocktakingsScreen extends React.Component {

      constructor(props) {
    super(props);
    this.child = React.createRef();
  }

    state = {
        "search": ""
    };

        componentDidMount() {
        this._onRefresh(1)
    }

    _onRefresh = () => {
        this.child.current._onRefresh(1);
    }

        async fetchData(page) {
        await getStocktakings({page: page, page_size: this.state.pageSize}).then((res) => {
            {
                this.setState(res)
            }
        })
    }

    onPressNavigateToNewStocktaking = () => {
        const {navigate} = this.props.navigation;
        navigate('StocktakingAdd', {onRefresh: () => this._onRefresh()})
    }

      static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchbar}>
                    <View style={{flex: 1}}>
                        <Input style={styles.search} value={this.state.search}
                               placeholder={"Search..."}/>
                    </View>
                </View>
                <StocktakingsContainer nav={this.props.navigation} ref={this.child}/>

                <Button onPress={() => this.onPressNavigateToNewStocktaking()} title={"Add new stocktaking"}
                        buttonStyle={{backgroundColor: "#40c1ac"}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        maxHeight: "100%"
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    searchbar: {
        flexDirection: 'row',
    },
    search: {
        maxWidth: 40
    }
});
