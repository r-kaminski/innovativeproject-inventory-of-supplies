import React from "react";
import { Icon } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import AnimatedTabButton from "../components/AnimatedTabButton.js";
import { openSupplyModal } from "../redux/actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    openSupplyModal: modal => dispatch(openSupplyModal(modal))
  };
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    borderRadius: 8,
    flexDirection: "row",
    height: 52,
    elevation: 2,
    backgroundColor: "#FFF"
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

class AnimatedTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currRouteIndex: -1,
      prevRouteIndex: -1
    };
  }

  render() {
    const {
      renderIcon,
      getLabelText,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation
    } = this.props;

    const { routes, index: activeRouteIndex } = navigation.state;
    return (
      <View style={styles.container}>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
          return (
            <AnimatedTabButton
              key={routeIndex}
              active={isRouteActive}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
              renderIcon={() =>
                renderIcon({ route, focused: isRouteActive, tintColor })
              }
              text={getLabelText({ route })}
            />
          );
        })}
        <View
          style={{
            alignSelf: "center",
            height: 22,
            width: 1,
            backgroundColor: "#95989A"
          }}
        />
        <TouchableOpacity
          style={{ width: 58, alignSelf: "center" }}
          accessibilityLabel="New"
          onPress={() => {
            if (navigation.state.index === 0) {
              const { navigate } = this.props.navigation;
              navigate("SupplyAdd", { onRefresh: () => this._onRefresh() });
            } else if (navigation.state.index === 1) {
              const { navigate } = this.props.navigation;
              navigate("StocktakingAdd", {
                onRefresh: () => this._onRefresh()
              });
            }
            //        this.props.openSupplyModal({ open: true, target: null });
          }}
        >
          <Icon type="material" name="add-circle" color="#95989A" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 58, alignSelf: "center" }}
          accessibilityLabel="Search"
        >
          <Icon type="material" name="search" color="#95989A" />
        </TouchableOpacity>
      </View>
    );
  }
}

const TabBar = connect(
  null,
  mapDispatchToProps
)(AnimatedTabBar);
export default TabBar;
//export default props => <AnimatedTabBar {...props} />;
