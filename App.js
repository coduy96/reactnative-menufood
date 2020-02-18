import React, { Component } from "react";
import { View } from "react-native";
import BasicFlatList from "./components/BasicFlatList";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <BasicFlatList></BasicFlatList>
      </View>
    );
  }
}
