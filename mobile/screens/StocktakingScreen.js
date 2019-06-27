import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  getStocktaking,
  updateStocktaking
} from "../services/StocktakingService";
import { CheckBox, ListItem, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { navBarConfig } from "../redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    setNavBarConfig: config => dispatch(navBarConfig(config))
  };
};

class StocktakingScreen extends React.Component {
  state = {
    search: "",
    stocktaking: null,
    results: [],
    pageSize: 8,
    count: 0,
    refreshing: false,
    page: 1,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", payload =>
      this._onRefresh(this.state.page)
    );

    this.props.navigation.addListener('willFocus', (route)=>{
      this.props.setNavBarConfig({
        showNavBar: true,
        showButtonNew: false,
        showButtonSearch: false,
        showButtonQr: true,
        buttonQrAction: ()=>{
          this.props.navigation.navigate("StocktakingScanner", {
            stockId: this.props.navigation.getParam("id"),
            origin: 'StocktakingScreen'
          });
        }
      });
    })
  }

  _onRefresh = (page, search = "") => {
    this.setState({ refreshing: true, page: page ? page : 1 });
    this.fetchData(page ? page : 1, search).then(() => {
      this.setState({ refreshing: false });
    });
  };

  async fetchData(page, search) {
    await getStocktaking(this.props.navigation.getParam("id"), {
      page: page,
      page_size: this.state.pageSize,
      name: search
    }).then(res => {
      {
        page === 1
          ? this.setState({ ...this.state, ...res, page: 1 })
          : this.setState({
              ...this.state,
              ...res,
              results: [...this.state.results, ...res.results]
            });
      }
    });
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={this.state.results}
          keyExtractor={item => item.supply.id.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              style={styles.listItem}
              title={
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View>
                    <Text>{item.supply.name}</Text>
                  </View>
                  <View style={{ width: 40 }}>
                    <CheckBox
                      checked={item.is_checked}
                      onPress={() => {
                        const res = this.state.results;
                        console.log(index);
                        res[index].is_checked = !res[index].is_checked;
                        updateStocktaking(
                          this.props.navigation.getParam("id"),
                          item.supply.id,
                          item.is_checked
                        ).then(() => {
                          this.setState({
                            ...this.state,
                            results: res
                          });
                        });
                      }}
                    />
                  </View>
                </View>
              }
              subtitle={
                <Text
                  style={styles.subtitle}
                  ellipsizeMode={"tail"}
                  numberOfLines={1}
                >
                  {item.supply.description}
                </Text>
              }
            />
          )}
          onEndReached={() => {
            if (this.state.page < this.state.count / this.state.pageSize) {
              this._onRefresh(this.state.page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          initialNumToRender={this.state.pageSize}
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
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: "#d0d0d0",
    backgroundColor: "transparent"
  },
  subtitle: {
    color: "#d0d0d0"
  },
});

const Stocktaking = connect(
  null,
  mapDispatchToProps
)(StocktakingScreen);
export default Stocktaking;