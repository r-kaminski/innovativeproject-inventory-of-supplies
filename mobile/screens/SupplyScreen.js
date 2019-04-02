import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getSupply} from "../services/SuppliesService";


export default class SupplyScreen extends React.Component {

    state = {
        isShowingText: true,
        supply:
            {
                id: "345876",
                name: "młotek",
                container: false,
                localization: "A1",
                contains: []
            }
    };

    componentDidMount() {
        getSupply(this.props.navigation.getParam("id")).then((res) => {
            {
                console.log(res)
                this.setState({supply: res})
            }
        })
    }


    static navigationOptions = {
        title: 'Narzędzia',
    };

    onPressEditTool = () => {
        const {navigate} = this.props.navigation;
        navigate('SupplyEdit')
    }

    render() {
        const {supply} = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={{
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    borderColor: 'red',
                    borderWidth: 1,
                    padding: 20
                }}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: 'red',
                        borderBottomWidth: 1,
                        padding: 20
                    }}>
                        <Image
                            source={{uri: 'https://via.placeholder.com/150'}}
                            resizeMode="contain"
                            fadeDuration={0}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionText}>
                            {supply.id}
                        </Text>
                        <Text style={styles.optionText}>
                            {supply.name}
                        </Text>
                        <Text style={styles.optionText}>
                            {supply.state}
                        </Text>
                        <Text style={styles.optionText}>
                            {supply.description}
                        </Text>
                        <Text style={styles.optionText}>
                            {supply.localization}
                        </Text>

                    </View>
                </View>
                <Button onPress={() => this.onPressEditTool()} title={"Edytuj"}
                        color={"#098584"}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginTop: 1,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
    // container: {
    //   flex: 1,
    //   paddingTop: 15,
    // },
    optionsTitleText: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 12,
    },
    optionIconContainer: {
        marginRight: 9,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    optionText: {
        fontSize: 15,
        marginTop: 1,
    },
});
