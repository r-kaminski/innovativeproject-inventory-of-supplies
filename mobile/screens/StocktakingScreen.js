import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
import {
  getStocktaking,
  updateStocktaking
} from "../services/StocktakingService";
import { connect } from "react-redux";
import { navBarConfig } from "../redux/actions/index";
import ReportDetailsListItem from "../components/ReportDetailsListItem";

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
    imgResizeRatio: 0
  };

  componentDidMount() {
    this.setState({ imgResizeRatio: Dimensions.get("window").width / 560 });

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
        <Image
          source={require("../assets/images/bg_header.png")}
          resizeMode="contain"
          style={{
            position: "absolute",
            top: 0,
            width: 360,
            height: 157 * this.state.imgResizeRatio,
            flex: 1,
            zIndex: 5
          }}
        />
        <View style={styles.headerContainer}>
          <Text>
            <Text style={styles.headerTitle}>Report </Text>
            <Text style={styles.headerSubtitle}>@MAKERSPACE</Text>
          </Text>
          <Text style={styles.headerItemCount}>total of X items</Text>
        </View>
        <FlatList
          data={this.state.results}
          contentContainerStyle={{
            paddingTop: 157 * this.state.imgResizeRatio
          }}
          keyExtractor={item => item.supply.id.toString()}
          renderItem={({ item, index }) => (
            <ReportDetailsListItem
              item={item}
              onPress={()=>{
                const res = this.state.results;
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
              onCheckBoxPress={() => {
                const res = this.state.results;
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
              }}/>
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
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    position: "absolute",
    paddingTop: 8,
    paddingLeft: 16,
    top: 0,
    zIndex: 6
  },
  headerTitle: {
    fontFamily: "nunito-extrabold",
    fontSize: 38,
    color: "white"
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "nunito-extrabold",
    color: "#FFCE7B",
    paddingLeft: 6
  },
  headerItemCount: {
    fontFamily: "nunito-extralight",
    fontSize: 12,
    color: "#FFF"
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: "#d0d0d0"
  },
  subtitle: {
    color: "#d0d0d0"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 1
  }
});

const Stocktaking = connect(
  null,
  mapDispatchToProps
)(StocktakingScreen);
export default Stocktaking;