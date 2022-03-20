import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Share,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { H1, H4 } from "../components/Text";
import ConfettiCannon from "react-native-confetti-cannon";
import { Player } from "@react-native-community/audio-toolkit";

const Result = ({ navigation, route }) => {
  const [hideConfetti, setHideConfetti] = useState(false);
  const [explosion, setExplosion] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your score",
      headerLeft: "",
    });
  }, [navigation]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Hi, I scored ${route.params.score}/10 on the quiz app. Can you beat me?`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNavigation = () => {
    navigation.replace("Topics");
  };

  const playAudio = async () => {
    const yay = new Player("yay.mp3");

    yay.play();
  };

  useEffect(() => {
    if (explosion && !hideConfetti) {
      explosion.start();
    }
  }, [explosion, hideConfetti]);

  useEffect(() =>{
    playAudio();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHideConfetti(true);
    }, 7000);
  }, []);

  return (
    <LinearGradient
      colors={["#667db6"]}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.container}
    >
      {!hideConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={false}
          ref={(ref) => setExplosion(ref)}
        />
      )}

      <H1 style={{ fontSize: 25 }} color="cyan">
        Your score is: {route.params.score}/10
      </H1>

      <H1 style={{ fontSize: 25 }} color="white">
        {(route.params.score / 20) * 100}%
      </H1>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <H4>Share Your Score</H4>
      </TouchableOpacity>

      <Pressable style={styles.buttonOrange} onPress={handleNavigation}>
        <H4 color="white">Play Some Other Quiz</H4>
      </Pressable>
    </LinearGradient>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonOrange: {
    backgroundColor: "#E55451",
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },
});
