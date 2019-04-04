import React from 'react';
import {View} from 'react-native';
import {clearSession} from "../services/AuthService";
import {Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Feather';


export default class ButtonsRow extends React.Component {
    state = {};

    render() {

        return (
            <View key={"1"} style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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
