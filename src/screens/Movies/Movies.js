import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api_key, APP_URL, Img_url } from "../../apis";
import { useSelector, useDispatch } from "react-redux";

const Movies = (props) => {
  const { navigation } = props;
  const [post, setpost] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${APP_URL}/movie/popular?api_key=${api_key}&language=en-US&page=${count}`
      )
      .then((res) => {
        setpost(res.data.results);
      });
  }, [post]);
  return (
    <View style={styles.container}>
    
        <View style={styles.container}>
          {post.map((item, index) => (
            <View style={styles.view} keyExtractor={item.id} key={item.id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", {
                    data: item,
                  })
                }
              >
                <Image
                  source={{ uri: `${Img_url}/${item.poster_path}` }}
                  style={styles.img}
                  key={item.poster_path}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        {count == 1 ? null : (
          <Ionicons
            name="arrow-back-circle"
            size={40}
            color="#fff"
            style={{ marginTop: -50, marginRight: -40 }}
            onPress={() => setCount(count - 1)}
          />
        )}

        <Ionicons
          name="arrow-forward-circle"
          size={40}
          color="#fff"
          style={{ marginTop: -50, marginLeft: 360 }}
          onPress={() => setCount(count + 1)}
        />
      </View>
    </View>
  );
};

export default Movies;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  view: {
    padding: 5,
  },
  img: {
    width: 127,
    height: 195,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 10,
  },
});
