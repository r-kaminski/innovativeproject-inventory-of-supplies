import React from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  Animated
} from "react-native";
import SuppliesContainer from "./SuppliesContainer";
import { connect } from "react-redux";
import { showSearchBar, navBarConfig } from "../redux/actions/index";
import FloatingSearchBar from "../components/FloatingSearchBar";
import SupplyModal from "../components/SupplyModal";

const mapStateToProps = state => {
  return { showSearchBar: state.showSearchBar };
};

const mapDispatchToProps = dispatch => {
  return {
    setShowSearchBar: show => dispatch(showSearchBar(show)),
    setNavBarConfig: config => dispatch(navBarConfig(config))
  };
};

class SuppliesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      search: "",
      keyboardOffset: new Animated.Value(0),
      modalVisible: false,
      modalSupplyId: -1,
    };
  }
  

  componentDidMount() {
    const supplyId = this.props.navigation.getParam('id', -1);
    if(supplyId > -1)
      this.setState({modalVisible: true, modalSupplyId: supplyId});

    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    this.props.navigation.addListener('willFocus', (route)=>{
      this.props.setNavBarConfig({
        showNavBar: true,
        showButtonNew: true,
        buttonNewAction: ()=>{
          this.setState({modalVisible: true, modalSupplyId: -1});
          // const { navigate } = this.props.navigation;
          // navigate("SupplyAdd", { onRefresh: () => this._onRefresh() });
        },
        showButtonSearch: true,
        showButtonQr: false
      });
    })
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  _keyboardDidShow = event => {
    const keyboardHeight = event.endCoordinates.height;
    Animated.timing(this.state.keyboardOffset, {
      toValue: -(keyboardHeight - 60),
      duration: 50,
      useNativeDriver: true
    }).start();
  };

  _keyboardDidHide = event => {
    Animated.timing(this.state.keyboardOffset, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true
    }).start();
  };

  _onRefresh = () => {
    this.child.current._onRefresh(1);
  };

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.modalVisible &&
          <SupplyModal 
            visible={this.state.modalVisible}
            supplyId={this.state.modalSupplyId}
            onClose={()=>{
              this.setState({modalVisible: false, modalSupplyId: -1});
              this.child.current._onRefresh(1);
            }}/>
        }
        <SuppliesContainer
          nav={this.props.navigation}
          search={this.state.search}
          ref={this.child}
          onClickSupply={(id)=>{
            this.setState({
              modalVisible: true, 
              modalSupplyId: id});
          }}
        />

        {this.props.showSearchBar && (
          <Animated.View
            style={{
              ...styles.searchWrapper,
              transform: [{ translateY: this.state.keyboardOffset }]
            }}
          >
            <FloatingSearchBar 
              onPressQr={()=>{
                this.props.navigation.navigate("Scanner", {
                  origin: 'Supplies'
                });
              }}
              onChangeText={(text)=>{
                this.setState({search: text});
                this.child.current._onRefresh(1);
              }}
              onPressClose={()=>{
                this.child.current._onRefresh(1);
                this.props.setShowSearchBar({ show: false });
              }}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  searchWrapper: {
    position: "absolute",
    bottom: 68,
    left: 0,
    right: 0,
    paddingHorizontal: 8
  },
});

const Supplies = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliesScreen);
export default Supplies;
