import React from 'react';
import { StyleSheet, View } from 'react-native';
import StocktakingsContainer from "./StocktakingsContainer";
import { connect } from "react-redux";
import { navBarConfig } from "../redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    setNavBarConfig: config => dispatch(navBarConfig(config))
  };
};

class StocktakingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    componentDidMount(){
        this.props.navigation.addListener('willFocus', (route)=>{
            this.props.setNavBarConfig({
              showNavBar: true,
              showButtonNew: true,
              buttonNewAction: ()=>{
                const { navigate } = this.props.navigation;
                navigate("StocktakingAdd", {
                  onRefresh: () => this._onRefresh()
                });
              },
              showButtonSearch: false,
              showButtonQr: false
            });
          })
    }

    _onRefresh = () => {
        this.child.current._onRefresh(1);
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <StocktakingsContainer nav={this.props.navigation} ref={this.child} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        maxHeight: "100%"
    },
});

const Stocktakings = connect(
    null,
    mapDispatchToProps
  )(StocktakingsScreen);
  export default Stocktakings;
  