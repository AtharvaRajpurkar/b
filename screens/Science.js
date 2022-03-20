import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import Question from "../components/Question";
import { CircleFade } from "react-native-animated-spinkit";
import { H2 } from "../components/Text";
import { LinearGradient } from "expo-linear-gradient";
import data from "../data/science.json";

const PartsOfSpeech = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const jumbled_questions = questions;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Science",
    });
  }, [navigation]);

  useEffect(() => {
    setQuestions(data.sort(() => Math.random() - 0.5).slice(0, 10));
  }, [data]);

  const handleAnswer = (answer) => {
    setAnswered(true);

    if (answer === jumbled_questions[currentIndex].correct_answer) {
      setUserScore(userScore + 2);
      setAnswered(true);
    }
  };

  const handleNavigation = () => {
    setCurrentIndex(currentIndex + 1);
    setAnswered(null);
  };

  const handleResult = () => {
    navigation.replace("Result", {
      score: userScore,
    });
  };

  if (jumbled_questions.length > 0) {
    return (
      <LinearGradient
        colors={["#667db6"]}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.container}
      >
        <Question
          correctOption={jumbled_questions[currentIndex].correct_answer}
          incorrectOptions={jumbled_questions[currentIndex].incorrect_answers}
          data={jumbled_questions[currentIndex]}
          currentQuestionNumber={currentIndex + 1}
          answered={answered}
          handleAnswer={handleAnswer}
          key={jumbled_questions[currentIndex]}
          handleNavigation={handleNavigation}
          handleResult={handleResult}
        />
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        style={styles.loading}
        colors={["#0082c8"]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <CircleFade size={80} color="white" />
        <View style={{ height: 10 }} />
        <H2 color="white">Loading your questions...</H2>
      </LinearGradient>
    );
  }
};

export default PartsOfSpeech;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
