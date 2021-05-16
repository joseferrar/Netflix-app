import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Popular from "./Home/Popular/Popular";
import Tranding from "./Home/Tranding/Tranding";

const Home = ({ navigation }) => {
  return (
    <View>
      <ScrollView>
        <Popular navigation={navigation} />
        <Tranding navigation={navigation} />
        {/* <Tranding/> */}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
