import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { Icon } from "react-native-elements";

export default class ReportListItem extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.listItem} key={this.props.index}>
          <Icon
            type="material"
            name="description"
            color="#70B1C5"
            iconStyle={{ fontSize: 26 }}
          />
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              lineHeight: 23,
              marginLeft: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",             
              }}
            >
              <Text
                style={[styles.textBig, { marginRight: "auto" }]}
                ellipsizeMode={"tail"}
                numberOfLine={1}
              >
                {this.props.item.name}
              </Text>
            </View>
            <View style={{ 
              marginTop: -4,
              flexDirection: "row",
              alignItems: "baseline",
            }}>
              <Text style={[styles.textSmall, { color: "rgba(0,0,0,0.3)", marginRight: "auto" }]}>
                {this.props.item.date}
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
    height: 40,
    marginLeft: 20,
    marginRight: 22,
    marginTop: 15,
    marginBottom: 15,
  },
  textBig: {
    fontFamily: "nunito-extralight",
    fontSize: 20
  },
  textSmall: {
    fontFamily: "nunito-extralight",
    fontSize: 12
  }
});
