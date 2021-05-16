import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card, CardItem, Thumbnail, Left, Body, Right } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Img_url } from "../../apis";
import { auth, db } from "../../config/fire";
import { Toast } from "../../utils/Toast";

const MyList = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   const data = await db.collection("list").get();
  //   setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("list").get();
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
    setLoading(false);
  });
  // console.log(list)
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <ScrollView>
          {list.map((item) =>
            item?.email === auth?.currentUser?.email ? (
              <View >
                <Card key={item.mylist.id}>
                  <CardItem style={styles.CardItem}>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `${Img_url}/${item.mylist.poster_path}`,
                        }}
                        resizeMode="contain"
                        square
                      />

                      <Body>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {item.mylist.original_title}
                          {item.mylist.name}
                        </Text>
                        <Text style={{ color: "yellow" }} numberOfLines={1}>
                          {item.mylist.vote_average}
                        </Text>
                      </Body>
                    </Left>
                    <Right>
                      <MaterialIcons
                        name="delete"
                        size={35}
                        color="red"
                        onPress={() => {
                          Toast(
                            `Remove ${
                              item.mylist.original_title || item.mylist.name
                            }`
                          );
                          db.collection("list").doc(item.id).delete();
                        }}
                      />
                    </Right>
                  </CardItem>
                </Card>
              </View>
            ) : null
          )}
        </ScrollView>
      )}
      {/* <Text style={{ color: "#fff" }}>MyList</Text> */}
    </View>
  );
};

export default MyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  CardItem: {
    backgroundColor: "#282829",
    flexDirection: "row",
    elevation: 6
  },
});
