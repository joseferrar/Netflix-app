import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { List, ListItem, Text, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../config/fire";

const More = ({ navigation }) => {
  const logout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
      console.log("User signed out!");
    });
  };
  return (
    <View style={styles.container}>
      <List style={styles.list}>
        <ListItem itemHeader></ListItem>
        <ListItem itemDivider>
          <Text>Email</Text>
        </ListItem>
        <ListItem style={styles.list}>
          <FontAwesome name="circle" size={18} color="green" />
          <Text style={styles.text}>{auth?.currentUser?.email}</Text>
        </ListItem>
      </List>
      <Button block style={styles.button} onPress={logout}>
        <Text style={styles.button_text}> Logout </Text>
      </Button>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282829",
  },
  list: {},
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "red",
    marginRight: 50,
    marginLeft: 50,
    marginTop: 40,
    borderRadius: 6,
    height: 60,
    elevation: 10,
  },
  button_text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Roboto-Thin",
  },
});
