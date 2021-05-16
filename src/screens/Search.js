import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { api_key, APP_URL, Img_url } from "../apis";

const Search = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 3;
  const tileSize = screenWidth / numColumns;

  useEffect(() => {
    getPost();
  }, [query]);

  const getPost = () => {
    axios
      .get(`${APP_URL}/search/movie?api_key=${api_key}&query=${query}`)
      .then((response) => {
        setPost(response.data.results);
        // console.log(response);
        setLoading(false);
      });
    // .catch((error) => alert(error));
  };

  const updateChange = (event) => {
    event.preventDefault();
    setQuery(search);
    // setSearch('') //search clear screen
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        placeholderTextColor="gray"
        iconColor="#fff"
        autoCorrect
        theme={{
          colors: {
            text: "#fff",
          },
        }}
        style={styles.input}
        clearTextOnFocus
        focusable
        onSubmitEditing={updateChange}
        returnKeyType="done"
        onIconPress={updateChange}
        onChangeText={(search) => {
          setSearch(search);
          setQuery(search);
        }}
        value={search}
      />
      {isLoading ? (
        <View style={styles.loading}>
          <Text style={styles.loading_text}>No results found.</Text>
        </View>
      ) : (
        <ScrollView>
          <View>
            {/* {post.map((item, index) => (
            <Text style={{ color: "#fff" }}>{item.original_title}</Text>
          ))} */}

            <FlatList
              showsVerticalScrollIndicator
              data={post}
              refreshing={isLoading}
              numColumns={numColumns}
              onRefresh={getPost}
              keyExtractor={(item, key) => key.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Details", {
                      data: item,
                    });
                  }}
                >
                  <Image
                    source={{ uri: `${Img_url}/${item.poster_path}` }}
                    style={{ width: 138, height: 200 }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282829",
  },
  input: {
    backgroundColor: "#282829",
    borderWidth: 1,
    color: "#fff",
    height: 60,
    elevation: 8,
    marginTop: 32,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
  },
  loading_text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
