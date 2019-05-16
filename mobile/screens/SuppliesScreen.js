import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import SuppliesContainer from "./SuppliesContainer";
import { Button, Icon, Input } from "react-native-elements";

export default class SuppliesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  state = {
    search: ""
  };

  _onRefresh = () => {
    this.child.current._onRefresh(1);
  };

  static navigationOptions = {
    header: null
  };

  onPressNavigateToAddNewSupply = () => {
    const { navigate } = this.props.navigation;
    navigate("SupplyAdd", { onRefresh: () => this._onRefresh() });
  };

  render() {
    return (
      <View style={styles.container}>
        {/*         <View style={styles.searchbar}>
             <View style={{ flex: 1 }}>
                       <Input
                style={styles.search}
                value={this.state.search}
                placeholder={"Search..."}
                onChange={value => {
                  this.setState({ search: value.nativeEvent.text });
                  this.child.current._onRefresh(1);
                }}
	      />
            </View>
            <View
              style={{
                width: 30,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="qrcode"
                type="font-awesome"
                size={25}
                color="black"
                onPress={() => {
                  this.props.navigation.navigate("Scanner");
                }}
              />
            </View>
          </View>*/}
        <SuppliesContainer
          nav={this.props.navigation}
          search={this.state.search}
          ref={this.child}
        />

        <Button
          onPress={() => this.onPressNavigateToAddNewSupply()}
          title={"Add new supply"}
          buttonStyle={{ backgroundColor: "#40c1ac" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  searchbar: {
    flexDirection: "row"
  },
  search: {
    maxWidth: 40
  }
});
