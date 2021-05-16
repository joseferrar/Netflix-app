import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Linking,
} from "react-native";
import { Button, Badge } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api_key, APP_URL, Img_url, Video_url } from "../../../apis";
import { auth, db } from "../../../config/fire";
import { Toast } from "../../../utils/Toast";

const PopularDetails = (props) => {
  const { navigation } = props;
  const { data } = props.route.params;
  const [trailer, setTrailer] = useState([]);
  const type = data.original_title ? "movie" : "tv";

  navigation.setOptions(
    {
      headerStyle: {
        backgroundColor: "#282829",
        elevation: 0,
      },
      headerTitle: null,
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={26}
          color="#fff"
          style={{ marginLeft: 20 }}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="cast-connected"
            size={26}
            color="#fff"
            style={{ marginRight: 25 }}
          />
          <Ionicons
            name="search"
            size={26}
            color="#fff"
            style={{ marginRight: 25 }}
            onPress={() => navigation.navigate("Search")}
          />
        </View>
      ),
    },
    [navigation]
  );

  const onClick = () => {
    db.collection("list").add({
      mylist: data,
      email: auth.currentUser.email,
    });
    Toast(`Add Wish ${data.original_title || data.name}`);
  };

  useEffect(() => {
    axios
      .get(
        `${APP_URL}/${type}/${data.id}/videos?api_key=${api_key}&language=en-US`
      )
      .then((res) => {
        setTrailer(res.data.results);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: `${Img_url}/${data.poster_path}` }}
        style={styles.image}
      >
        <View>
          <View style={styles.tab}>
            <Text style={styles.title}>
              {data.original_title}
              {data.name}
            </Text>
          </View>
          <Button iconLeft style={styles.button} onPress={onClick}>
            <AntDesign name="plus" size={20} color="#fff" />
            <Text style={styles.text}>MY LIST</Text>
          </Button>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.date}>
              {data.release_date}
              {data.first_air_date}
            </Text>
            <Text style={styles.date}>
              {data.original_title && "MOVIE"}
              {data.name && "TV"} |
            </Text>
            <Text style={styles.language}>{data.original_language}</Text>
            <Text style={styles.date}>{data.vote_count}</Text>
            <Text style={styles.rating}>{data.vote_average}</Text>
          </View>
        </View>
      </ImageBackground>

      <Text style={styles.summary}>Summary</Text>
      <Text style={styles.overview}>{data.overview}</Text>
      <Text style={styles.heading3}>Watch Videos</Text>
      <View style={styles.videos}>
        {trailer.map((item, index) => (
          // <Text
          //   style={styles.summary}
          //   onPress={() => Linking.openURL(`${Video_url}${item?.key.slice(1)}`)}
          // >
          //   trailer
          // </Text>

          <Button
            iconLeft
            style={styles.trailer}
            onPress={() => Linking.openURL(`${Video_url}${item?.key}`)}
            key={index}
          >
            <FontAwesome name="youtube-play" size={20} color="#fff" />
            <Text style={styles.btn_text}>{item?.name}</Text>
          </Button>
        ))}
      </View>
    </ScrollView>
  );
};

export default PopularDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282829",
  },
  image: {
    height: 450,
    opacity: 0.8,
  },
  tab: {
    flexDirection: "row",
    marginTop: 350,
    paddingTop: 10,
    paddingBottom: 100,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#000",
  },
  heading1: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 6,
  },
  heading2: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Roboto-Thin",
    marginLeft: 8,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "OrelegaOne-Regular",
    marginTop: 0,
    marginRight: 40,
    textAlign: "left",
  },
  date: {
    color: "gray",
    fontSize: 14,
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  language: {
    color: "green",
    fontSize: 14,
    marginLeft: -10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rating: {
    color: "green",
    fontSize: 16,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  overview: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    marginTop: -85,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#282829",
    elevation: 10,
    marginLeft: 20,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  summary: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 70,
    marginLeft: 10,
  },
  videos: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  heading3: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginLeft: 10,
  },
  trailer: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 50,
    backgroundColor: "red",
    elevation: 10,
    marginLeft: 15,
    marginRight: 50,
    borderRadius: 10,
  },
  btn_text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
