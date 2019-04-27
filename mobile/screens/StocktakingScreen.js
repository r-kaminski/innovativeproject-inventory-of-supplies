import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getSupply} from "../services/SuppliesService";


export default class StocktakingScreen extends React.Component {

    state = {
        isShowingText: true,
        stacktaking: null,
    };

    componentDidMount() {
        this.reload();
    }


    reload() {
        getSupply(this.props.navigation.getParam("id")).then((res) => {
            {
                this.setState({stacktaking: res})
            }
        })
    }

    static navigationOptions = {
        header: null
    };

    onPressEditStacktaking = () => {
        const {navigate} = this.props.navigation;
        navigate('StacktakingEdit', {stacktaking: this.state.stacktaking, onGoBack: () => this.reload()})
    }

    render() {
        const {stacktaking} = this.state
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {this.state.stacktaking && <View style={styles.mainView}>
                        <Text style={styles.optionsTitleText}>
                            {stacktaking.name}
                        </Text>
                        <View style={styles.row}>


                        </View>
                    </View>}

                </ScrollView>
                <Button onPress={() => this.onPressEditStacktaking()} title={"Edit"}
                        color={"#098584"}/>
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
