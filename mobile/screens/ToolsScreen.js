import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Touchable from 'react-native-platform-touchable';


export default class LinksScreen extends React.Component {

  state = { isShowingText: true,
 tools: [
{
id: "1234567",
name: "szafa",
container: true,
localization: "A1",
contains: ["123", "345"]},
{id: "123",
name: "szuflada 1",
container: true,
localization: "A1",
contains: []},
{id: "345",
name: "szuflada 2",
container: true,
localization: "A1",
contains: []}
]};


  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        {this.state.tools.map((tool)=> {
          return  <Touchable
              key={tool.id}
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressDocs}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              {/*<Image*/}
                {/*source={require('./assets/images/expo-icon.png')}*/}
                {/*resizeMode="contain"*/}
                {/*fadeDuration={0}*/}
                {/*style={{ width: 20, height: 20, marginTop: 1 }}*/}
              {/*/>*/}
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                {tool.name}
              </Text>
            </View>
          </View>
        </Touchable>
        })}


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  // container: {
  //   flex: 1,
  //   paddingTop: 15,
  // },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});
