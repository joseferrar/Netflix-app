import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { Popular_movies } from "../../../actions/HomeAction";
import { Img_url } from "../../../apis";
import { useSelector, useDispatch } from "react-redux";

const Popular = ({navigation}) => {
  const [count, setCount] = useState(1);

  const data = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Popular_movies(count));
  }, [dispatch]);

  return (
    <View>
      <Text style={styles.text}>Popular on Netflix</Text>
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          {data.data.map((item, index) => (
            <View style={styles.view} keyExtractor={item.id} key={item.id}> 
              <TouchableOpacity onPress={() => navigation.navigate('Details', {
                  data: item,
              })}>
              <Image
                source={{ uri: `${Img_url}/${item.poster_path}` }}
                style={styles.img}
                key={item.poster}
              />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* <Button title="dfds" onPress={() => navigation.navigate('Details')}/> */}
    </View> 
  );
};

export default Popular;

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
