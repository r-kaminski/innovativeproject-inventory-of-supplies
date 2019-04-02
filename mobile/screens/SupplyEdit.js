import React from 'react';
import {Button, Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';


export default class SupplyEdit extends React.Component {

    state = {
        isShowingText: true,
        tool:
            {
                id: "345876",
                name: "młotek",
                container: false,
                localization: "A1",
                contains: []
            }
    };


    static navigationOptions = {
        title: 'Narzędzia',
    };

    onPressSave = () => {
        const {navigate, goBack} = this.props.navigation;
        // navigate('Tool')
        goBack()
    }

    render() {
        const {tool} = this.state
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
                        <TextInput style={styles.optionText}
                                   onChangeText={(text) => this.setState({tool: {...this.state.tool, name: text}})}>
                            {tool.name}
                        </TextInput>
                        <TextInput style={styles.optionText}>
                            {tool.id}
                        </TextInput>
                        <TextInput style={styles.optionText}>
                            {tool.localization}
                        </TextInput>

                    </View>
                </View>
                <Button onPress={() => this.onPressSave()} title={"Zapisz"}
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
