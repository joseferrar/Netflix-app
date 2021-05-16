import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
} from "native-base";
import { StyleSheet, Image, StatusBar } from "react-native";
import Home from "../screens/Home";
import logo from "../../assets/images/netflix.png";
import Shows from "../screens/Shows/Shows";
import MyList from "../screens/MyList/MyList";
import Movies from "../screens/Movies/Movies";

const TabHeader = ({ navigation }) => {
  return (
    <Container>
      <Header style={{ backgroundColor: "#000" }} />
      <StatusBar backgroundColor="#000" />
      <Tabs
        locked
        tabBarUnderlineStyle={{ width: 0 }}
        tabContainerStyle={{ elevation: 0 }}
        tabBarPosition="top"
        tabBarBackgroundColor="#fff"
      >
        <Tab
          style={{ backgroundColor: "#282829" }}
          heading={
            <TabHeading style={{ backgroundColor: "#000" }}>
              <Image style={styles.tinyLogo} source={logo} />
            </TabHeading>
          }
        >
          <Home navigation={navigation} />
        </Tab>
        <Tab
          style={{ backgroundColor: "#282829", color: "#fff" }}
          activeTextStyle={{ color: "#fff" }}
          heading={
            <TabHeading style={{ backgroundColor: "#000" }}>
              <Text style={{ color: "#fff" }}>TV Shows</Text>
            </TabHeading>
          }
        >
          <Shows navigation={navigation} />
        </Tab>
        <Tab
          style={{ backgroundColor: "#282829", color: "#fff" }}
          activeTextStyle={{ color: "#fff" }}
          heading={
            <TabHeading style={{ backgroundColor: "#000" }}>
              <Text style={{ color: "#fff" }}>Movies</Text>
            </TabHeading>
          }
        >
          <Movies navigation={navigation}/>
        </Tab>

        <Tab
          style={{ backgroundColor: "#282829", color: "#fff" }}
          activeTextStyle={{ color: "#fff" }}
          heading={
            <TabHeading style={{ backgroundColor: "#000" }}>
              <Text style={{ color: "#fff" }}>My List</Text>
            </TabHeading>
          }
        >
          <MyList navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TabHeader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    height: 600,
    borderRadius: 14,
  },
  tinyLogo: {
    width: 60,
    elevation: 10,
    height: 60,
    marginTop: -20,
    marginRight: 40,
  },
});
