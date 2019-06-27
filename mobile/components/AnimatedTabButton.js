import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    flexBasis: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default class AnimatedTabButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtWidth: new Animated.Value(this.props.active ? this.props.minWidth : 0),
      backgroundWidth: new Animated.Value(this.props.active ? 92 : 0),
    };
  }

  expand = () => {
    Animated.timing(this.state.txtWidth, {
      toValue: 54,
      duration: 300
    }).start();

    Animated.timing(this.state.backgroundWidth, {
      toValue: 92,
      duration: 300
    }).start();
  };

  contract = () => {
    Animated.timing(this.state.txtWidth, {
      toValue: 0,
      duration: 300
    }).start();

    Animated.timing(this.state.backgroundWidth, {
      toValue: 0,
      duration: 300
    }).start();
  };

  componentDidUpdate({ active }) {
    if (active != this.props.active) {
      if (!active) {
        this.setState(
          { width: new Animated.Value(0), bg_width: new Animated.Value(0) },
          () => this.expand()
        );
      } else {
        this.setState(
          { width: new Animated.Value(54), bg_width: new Animated.Value(92) },
          () => this.contract()
        );
      }
    }
  }

  render() {
    let { renderIcon, active, text, ...otherProps } = this.props;
    return (
      <Animated.View
        style={{
          ...styles.tabButton,
          minWidth: (this.props.minWidth > 92 ? this.props.minWidth :
            this.state.backgroundWidth.interpolate({
              inputRange: [0, this.props.minWidth, 92],
              outputRange: [this.props.minWidth, this.props.minWidth, 92]
            })),
        }}
      >
        <TouchableOpacity style={styles.tabButton} {...otherProps}>
          {renderIcon()}

          <Animated.View style={{ width: this.state.txtWidth }}>
            <Animated.Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={{ color: "#FFF", zIndex: 2 }}
            >
              {text}
            </Animated.Text>
          </Animated.View>

          <Animated.View
            style={{
              width: this.state.backgroundWidth,
              backgroundColor: "#FFCE7B",
              opacity: this.state.backgroundWidth.interpolate({
                inputRange: [0, 92],
                outputRange: [0, 1]
              }),
              position: "absolute",
              zIndex: -1,
              height: 30,
              borderRadius: 11
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}


AnimatedTabButton.defaultProps = {
  minWidth: 54,
}