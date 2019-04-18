import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';


export default class LinksScreen extends React.Component {

    state = {
        isShowingText: true,
        tools: [
            {
                id: "1234567",
                name: "szafa",
                container: true,
                localization: "A1",
                contains: ["123", "345"]
            },
            {
                id: "123",
                name: "szuflada 1",
                container: true,
                localization: "A1",
                contains: []
            },
            {
                id: "345",
                name: "szuflada 2",
                container: true,
                localization: "A1",
                contains: []
            },
            {
                id: "345876",
                name: "młotek",
                container: false,
                localization: "A1",
                contains: []
            }

        ]
    };


    static navigationOptions = {
        title: 'Narzędzia',
    };

    render() {
        return (
            <ScrollView style={styles.container}>

                {this.state.tools.map((tool) => {
                    return <Touchable
                        key={tool.id}
                        style={styles.option}
                        background={Touchable.Ripple('#ccc', false)}
                        onPress={() => this._handlePressTool(tool.id)}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>
                                    {tool.name}
                                </Text>
                            </View>
                        </View>
                    </Touchable>
                })}


            </ScrollView>
        );
    }

    _handlePressTool = (id) => {
        const {navigate} = this.props.navigation;
        navigate('Tool', {id: id})
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1,
    },
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
        borderBottomColor: '#EDEDED',
    },
    optionText: {
        fontSize: 15,
        marginTop: 1,
    },
});
