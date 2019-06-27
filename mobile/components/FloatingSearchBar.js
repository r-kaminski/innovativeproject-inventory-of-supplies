import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Icon } from "react-native-elements";

export default class FloatingSearchBar extends React.Component{
    state = {
        search: "",
    }
    
    render(){
        return (
            <View style={styles.searchBar}>
                <TouchableOpacity
                style={{
                    width: 30,
                    marginHorizontal: 10,
                    alignSelf: "center"
                }}
                accessibilityLable={"Search"}
                onPress={() => this.props.onPressQr()}
                >
                <Icon
                    name="qrcode"
                    type="font-awesome"
                    color="#CE71A8"
                    size={30}
                />
                </TouchableOpacity>
                <View style={{ width: 1, height: 22, backgroundColor: "#999" }} />
                <View style={styles.searchField}>
                <TextInput
                    style={styles.input}
                    value={this.state.search}
                    placeholder={"Search away!"}
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                        this.setState({ search: value });
                        this.props.onChangeText(value);
                    }}
                />
                </View>
                <TouchableOpacity
                style={{
                    width: 30,
                    marginHorizontal: 10,
                    alignSelf: "center"
                }}
                accessibilityLable={"Close search"}
                onPress={() => {
                    this.props.onChangeText("");
                    this.setState({ search: "" });
                    this.props.onPressClose();
                }}
                >
                <Icon name="clear" type="material" color="#CE71A8" />
                </TouchableOpacity>
            </View>
        );
    }
}

FloatingSearchBar.defaultProps = {
    onPressQr: ()=>void(0),
    onChangeText: (text)=>void(0),
    onPressClose: ()=>void(0)
}

const styles = StyleSheet.create({
    searchBar: {
      height: 52,
      backgroundColor: "#FFF",
      borderRadius: 8,
      elevation: 2,
      flexDirection: "row",
      alignItems: "center"
    },
    buttonQr: {
      height: 52,
      width: 56,
      alignItems: "center"
    },
    searchField: {
      flex: 1,
      marginHorizontal: 10
    },
    input: {
      color: "black",
      fontSize: 14,
      fontFamily: "nunito-extralight",
      height: 52
    }
  });