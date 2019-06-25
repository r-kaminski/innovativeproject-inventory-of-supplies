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
    console.log(props.text + " constructor");
    this.state = {
      width: new Animated.Value(this.props.active ? 54 : 0),
      bg_width: new Animated.Value(this.props.active ? 92 : 0)
    };
  }

  expand = () => {
    Animated.timing(this.state.width, {
      toValue: 54,
      duration: 300
    }).start();

    Animated.timing(this.state.bg_width, {
      toValue: 92,
      duration: 300
    }).start();
  };

  contract = () => {
    Animated.timing(this.state.width, {
      toValue: 0,
      duration: 300
    }).start();

    Animated.timing(this.state.bg_width, {
      toValue: 0,
      duration: 300
    }).start();
  };

  componentDidUpdate({ active }) {
    console.log(this.props.text + " update");
    if (active != this.props.active) {
      if (!active) {
        console.log(this.props.text + "expand");
        this.setState(
          { width: new Animated.Value(0), bg_width: new Animated.Value(0) },
          () => this.expand()
        );
      } else {
        console.log(this.props.text + "contract");
        this.setState(
          { width: new Animated.Value(54), bg_width: new Animated.Value(92) },
          () => this.contract()
        );
      }
    }
    //	  this.setState({ width: new Animated.Value(this.props.active ? 0 : 54)})
  }

  render() {
    let { renderIcon, active, text, ...otherProps } = this.props;
    return (
      <Animated.View
        style={{
          ...styles.tabButton,
          minWidth: active ? this.state.bg_width : 54
        }}
      >
        <TouchableOpacity style={styles.tabButton} {...otherProps}>
          {renderIcon()}

          <Animated.View style={{ width: this.state.width }}>
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
              width: this.state.bg_width,
              backgroundColor: "#FFCE7B",
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
