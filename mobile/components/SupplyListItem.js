import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Icon } from "react-native-elements";

export default class SupplyListItem extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.listItem} key={this.props.index}>
          <Icon
            type="entypo"
            name="dot-single"
            color="#70B1C5"
            iconStyle={{ fontSize: 26 }}
          />
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              lineHeight: 23,
              marginLeft: 10
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "baseline"
              }}
            >
              <Text
                style={[styles.textBig, { marginRight: "auto" }]}
                ellipsizeMode={"tail"}
                numberOfLine={1}
              >
                {this.props.item.name}
              </Text>
              <Text>
                <Text style={styles.textBig}>1</Text>
                <Text style={[styles.textSmall, { lineHeight: 22 }]}>pc.</Text>
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textSmall, { color: "rgba(0,0,0,0.3)" }]}>
                #012345678912
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    height: 48,
    marginLeft: 14,
    marginRight: 22,
    marginTop: 15,
    marginBottom: 15
  },
  textBig: {
    fontFamily: "nunito-extralight",
    fontSize: 22
  },
  textSmall: {
    fontFamily: "nunito-extralight",
    fontSize: 14
  }
});
