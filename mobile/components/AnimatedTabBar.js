import React from "react";
import { Icon } from "react-native-elements";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import AnimatedTabButton from "../components/AnimatedTabButton.js";
import { openSupplyModal, showSearchBar } from "../redux/actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    setOpenSupplyModal: modal => dispatch(openSupplyModal(modal)),
    setShowSearchBar: show => dispatch(showSearchBar(show)),
  };
}

function mapStateToProps(state) {
  return { navBarConfig: state.navBarConfig };
}

class AnimatedTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currRouteIndex: -1,
      prevRouteIndex: -1,
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
      navigation,
      navBarConfig
    } = this.props;

    let iconCount = 3;
    if(navBarConfig.showButtonNew)++iconCount;
    if(navBarConfig.showButtonSearch)++iconCount;
    if(navBarConfig.showButtonQr)++iconCount;
    const btnMinWidth = (Dimensions.get("window").width - 92)/iconCount;


    const { routes, index: activeRouteIndex } = navigation.state;
    return (
      <View style={styles.container}>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
          return (
            <AnimatedTabButton
              minWidth={btnMinWidth}
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
        {iconCount !== 3 &&
        <View
          style={{
            alignSelf: "center",
            height: 22,
            width: 1,
            backgroundColor: "#95989A"
          }}
        />
        }
        {navBarConfig.showButtonNew &&
        <TouchableOpacity
          style={{ width: btnMinWidth, alignSelf: "center" }}
          accessibilityLabel="New"
          onPress={() => navBarConfig.buttonNewAction()}
        >
          <Icon type="material" name="add-circle" color="#CE71A8" />
        </TouchableOpacity>
        }

        {navBarConfig.showButtonQr &&
        <TouchableOpacity
          style={{ width: btnMinWidth, alignSelf: "center" }}
          accessibilityLabel="Search"
          onPress={() => navBarConfig.buttonQrAction()}
        >
          <Icon type="font-awesome" name="qrcode" color="#CE71A8" />
        </TouchableOpacity>
        }

        {navBarConfig.showButtonSearch &&
        <TouchableOpacity
          style={{ width: btnMinWidth, alignSelf: "center" }}
          accessibilityLabel="Search"
          onPress={() => {
            this.props.setShowSearchBar({ show: true });
          }}
        >
          <Icon type="material" name="search" color="#CE71A8" />
        </TouchableOpacity>
        }
      </View>
    );
  }
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

const TabBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedTabBar);
export default TabBar;
//export default props => <AnimatedTabBar {...props} />;
