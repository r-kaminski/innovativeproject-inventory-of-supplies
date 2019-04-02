import React from 'react';
import {StyleSheet, View} from 'react-native';
import {clearSession} from "../services/AuthService";
import {Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Feather';


export default class ButtonsRow extends React.Component {
    state = {};

    render() {

        return (
            <View key={"1"} style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {/*<Button style={styles.button} onPress={() => {*/}
                {/*getToken().then(console.log)*/}
                {/*}} title={"testuj secure store"}*/}
                {/*color={"#098584"}/>*/}
                {/*<Button style={styles.button} onPress={() => {*/}
                {/*signIn();*/}
                {/*}} title={"zaloguj"}*/}
                {/*color={"#098584"}/>*/}
                {/*<Button style={styles.button} onPress={() => {*/}
                {/*clearSession()*/}
                {/*.then((res) => res && this.props.onPressLogout())*/}

                {/*}} title={"Wyloguj"}*/}
                {/*color={"#098584"}/>*/}
                <Button
                    icon={<Icon
                        name='lock'
                        size={18}
                        color='#ffffff'
                    />}
                    type="clear"
                    onPress={() => {
                        clearSession()
                            .then((res) => res && this.props.onPressLogout())

                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginLeft: 8,
    },
});
