import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from 'react-redux'
import Navbar from "./src/Navbar/Navbar";
import store from "./src/store/index"
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto-Thin': require("./assets/fonts/Roboto-Thin.ttf"),
    'OrelegaOne-Regular': require("./assets/fonts/OrelegaOne-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Navbar />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282829",
  },
});
