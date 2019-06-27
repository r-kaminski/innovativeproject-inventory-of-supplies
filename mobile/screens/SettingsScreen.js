import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { connect } from "react-redux";
import { navBarConfig } from "../redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    setNavBarConfig: config => dispatch(navBarConfig(config))
  };
};

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route)=>{
      this.props.setNavBarConfig({
        showNavBar: true,
        showButtonNew: false,
        showButtonSearch: false,
        showButtonQr: false
      });
    })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}

const Settings = connect(
  null,
  mapDispatchToProps
)(SettingsScreen);
export default Settings;