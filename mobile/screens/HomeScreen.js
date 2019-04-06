import React from 'react';
import {Button, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WebBrowser} from 'expo';
import {getRooms, postRoom} from '../services/RoomsService';
import {clearSession} from "../services/AuthService";

export default class HomeScreen extends React.Component {
    state = {rooms: []}
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        getRooms().then((res) => {
            res && this.setState({rooms: res})
        })

        //jesli jest tylko jeden pokoj to pomin ekran wyboru pokoju
        if (this.state.rooms.length == 1) {
            this.onPressRoom(this.state.rooms[0].id)
        }
    }

    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <View style={styles.container}>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.getStartedContainer}>

                        <Text style={styles.getStartedText}>Makerspace Inventory App</Text>

                    </View>

                    {
                        this.state.rooms.map((room) => {
                            return <View key={room.id} style={{padding: 10}}>
                                <TouchableOpacity onPress={this._onPress}>
                                    <Button onPress={() => this.onPressRoom(room.id)} title={room.name}
                                            color={"#841584"}/>
                                </TouchableOpacity>
                            </View>
                        })
                    }
                </ScrollView>

                <Button onPress={() => this.onPressAddRoom()} title={"Dodaj nowy pokój"}
                        color={"#098584"}/>
            </View>
        );
    }

    onPressRoom = (id) => {
        console.log(id)
        const {navigate} = this.props.navigation;
        navigate('Main', {id: id})
    }

    onPressAddRoom = () => {
        postRoom("lala").then((res) => console.log(res))
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                    tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://google.com'
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1,

    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
