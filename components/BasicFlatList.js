import React, { Component } from "react";
import SwipeOut from "react-native-swipeout";
import { Text, View, Image, Alert, FlatList } from "react-native";
import flatListItem from "../data/flatListData";

export default class DefaultFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null
    };
  }
  refreshFlatList = deletedKey => {
    this.setState(() => {
      return {
        deletedRowKey: deletedKey
      };
    });
  };
  render() {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <FlatList
          data={flatListItem}
          renderItem={({ item, index }) => {
            return (
              <FlatListItem item={item} index={index} parentFlatList={this} />
            );
          }}
        ></FlatList>
      </View>
    );
  }
}

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null
    };
  }
  render() {
    const { item } = this.props;
    const { index } = this.props;
    const { parentFlatList } = this.props;
    const swipeOutObj = {
      autoClose: true,
      rowId: index,
      sectionId: 1,
      right: [
        {
          onPress: () => {
            Alert.alert("Alert", "Are you sure ?", [
              { text: "No", onPress: () => {}, style: "cancel" },
              {
                text: "Yes",
                onPress: () => {
                  flatListItem.splice(index, 1);
                  // refresh flat list
                  parentFlatList.refreshFlatList(this.state.activeRowKey);
                }
              }
            ]);
          },
          text: "Delete",
          type: "delete"
        }
      ]
    };

    return (
      <SwipeOut {...swipeOutObj}>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              backgroundColor: "tomato",
              flex: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.url }}
            />
            <View>
              <Text style={{ margin: 20 }}>{item.food}</Text>
              <Text style={{ margin: 20 }}>{item.description}</Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: "white" }}></View>
        </View>
      </SwipeOut>
    );
  }
}
