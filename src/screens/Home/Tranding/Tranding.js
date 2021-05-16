import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Tranding_items } from "../../../actions/HomeAction";
import { Img_url } from "../../../apis";
import { useSelector, useDispatch } from "react-redux";

const Tranding = ({ navigation }) => {
  const data = useSelector((state) => state.tranding);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Tranding_items());
  }, [dispatch]);

  return (
    <View>
      <Text style={styles.text}>Tranding Now</Text>
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          {data.data.map((item, index) => (
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
      </ScrollView>
    </View>
  );
};

export default Tranding;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  view: {
    marginTop: 10,
    padding: 5,
  },
  img: {
    width: 150,
    height: 200,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 10,
  },
});
