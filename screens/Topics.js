import React, { useLayoutEffect } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// components
import Topic from "../components/Topic";
import { H1, H3 } from "../components/Text";

const Topics = ({ navigation }) => {
  const topics = [
    { name:"Science", link: "Science", id: 1 },
    { name: "Technology", link: "Technology", id: 2 },
    { name: "Engineering", link: "Engineering", id: 3 },
    { name: "Mathematics", link: "Mathematics", id: 4 },
    
   
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Topics",
      headerLeft: "",
    });
  });

  const deviceHeight = Dimensions.get("window").height;

  const marginTopTextContainer = deviceHeight > 700 ? 20 : 20;
  const marginTopTopicsContainer = deviceHeight > 700 ? 20 : 20;

  return (
    <LinearGradient
      colors={["#667db6","#667db6"]}
      start={[0,0]}
      end={[1, 0]}
      style={styles.container}
    >
      <View style={{ marginTop: marginTopTextContainer }}>
        <H1 color="white"> Quiz App </H1>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: marginTopTopicsContainer, marginBottom: 25 }}
      >
        {topics.map(({ name, link, id }) => (
          <Topic name={name} link={link} navigation={navigation} key={id} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <H3 color="white">Made by Atharva Swapnil Rajpurkar</H3>
      </View>
    </LinearGradient>
  );
};

export default Topics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    marginTop: 30,
  },
  topicsContainer: {
    marginTop: 40,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
    padding: 6,
  },
});
