import React, { Component } from "react";
import { Text, View, Image, Alert, FlatList, Dimensions } from "react-native";
import Modal from "react-native-modalbox";
import Button from "react-native-button";
import flatListItem from "../data/flatListData";
import { TextInput } from "react-native";
import randomString from "random-string";

const screen = Dimensions.get("window");

export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFoodName: "",
      newFoodDescription: ""
    };
  }
  showModal = () => {
    this.refs.myModal.open();
  };
  render() {
    return (
      <Modal
        ref={"myModal"}
        style={{
          justifyContent: "center",
          borderRadius: 30,
          shadowRadius: 10,
          width: screen.width - 80,
          height: 250
        }}
        position="center"
        backdrop={true}
        onClosed={() => {}}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40
          }}
        >
          Add new food here
        </Text>

        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            marginBottom: 10,
            borderBottomWidth: 1
          }}
          placeholder="Food name"
          value={this.state.newFoodName}
          onChangeText={text => {
            this.setState({ newFoodName: text });
          }}
        />
        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            marginBottom: 10,
            borderBottomWidth: 1
          }}
          placeholder="Food description"
          value={this.state.newFoodDescription}
          onChangeText={text => {
            this.setState({ newFoodDescription: text });
          }}
        />
        <Button
          style={{
            color: "white"
          }}
          containerStyle={{
              padding: 8,
              marginLeft: 70,
              marginRight: 70,
              height: 40,
              borderRadius: 6,
              backgroundColor: 'mediumseagreen'
          }}
          onPress={() => {
            if(this.state.newFoodName == 0 || this.state.newFoodDescription == 0){
                alert('Please insert a value');
                return;
            }
            const newKey = randomString({length: 20});
            const newFood = {
                id: newKey,
                food: this.state.newFoodName,
                url: "https://picsum.photos/200/300",
                description: this.state.newFoodDescription
            }
            flatListItem.push(newFood);
            this.props.parentFlatList.refreshFlatList(newKey);
            this.refs.myModal.close();
          }}    
        >
          Save
        </Button>
      </Modal>
    );
  }
}
