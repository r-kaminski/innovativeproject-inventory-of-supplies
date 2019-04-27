import React from 'react';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getRooms, postRoom} from '../services/RoomsService';

export default class RoomsScreen extends React.Component {
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
        const {navigate} = this.props.navigation;
        navigate('Main', {id: id})
    }

    onPressAddRoom = () => {
        postRoom("lala").then((res) => console.log(res))
    }
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
});
