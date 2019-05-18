import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";

const styles = StyleSheet.create({
  container: { flexDirection: "row", height: 52, elevation: 2 },
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
      prevRouteIndex: -1,
      fadeValA: new Animated.Value(0),
      fadeValB: new Animated.Value(54),
      currFaderIn: "A"
    };
  }

  swapFaders() {
    this.setState({});
  }

  componentDidMount() {
    if (this.state.currRouteIndex != this.props.navigation.state.index)
      this.setState(
        {
          prevRouteIndex: this.state.currRouteIndex,
          currRouteIndex: this.props.navigation.state.index,
          fadeValA: new Animated.Value(0)
        },
        () => {
          if (this.state.currRouteIndex != this.state.prevRouteIndex) {
            Animated.timing(this.state.fadeValA, {
              toValue: 54,
              duration: 2000
            }).start();
          }
        }
      );
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

          let width = isRouteActive
            ? this.state.fadeValA
            : routeIndex === this.state.prevRouteIndex
            ? this.state.fadeValB
            : 0;

          return (
            <TouchableOpacity
              key={routeIndex}
              style={styles.tabButton}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
              {renderIcon({ route, focused: isRouteActive, tintColor })}

              {isRouteActive ? (
                <Animated.Text
                  ellipsizeMode="clip"
                  style={{ color: "#FFF", width }}
                >
                  {getLabelText({ route })}
                </Animated.Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default props => <AnimatedTabBar {...props} />;
