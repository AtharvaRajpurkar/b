import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Option from "./Option";
import { H4 } from "./Text";

const Question = ({
  data: { question, correct_answer, incorrect_answers },
  handleAnswer,
  currentQuestionNumber,
  answered,
  handleNavigation,
  handleResult,
}) => {
  const [shuffledOptions, setShuffledQuestions] = useState([]);

  const [options, setOptions] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
  });

  useEffect(() => {
    setShuffledQuestions(
      [
        correct_answer,
        incorrect_answers[0],
        incorrect_answers[1],
        incorrect_answers[2],
      ].sort(() => Math.random() - 0.5)
    );
  }, [correct_answer, incorrect_answers]);

  return (
    <View style={styles.question}>
      <View style={styles.questionContainer}>
        <H4>{`${currentQuestionNumber}. ${question}`}</H4>
      </View>

      <View style={styles.optionsContainer}>
        {shuffledOptions.map((option, index) => (
          <Option
            option={option}
            onPress={() => {
              handleAnswer(option);
              setOptions({ ...options, [index]: true });
            }}
            optionStyles={
              answered
                ? option === correct_answer
                  ? styles.optionCorrect
                  : options[index] === true
                  ? styles.optionIncorrect
                  : ""
                : ""
            }
            answered={answered}
            key={index}
          />
        ))}
      </View>

      {answered && currentQuestionNumber !== 10 ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleNavigation();
              setOptions({ 0: null, 1: null, 2: null, 3: null });
            }}
          >
            <H4 color="white" style={{ fontWeight: "500" }}>
              Next Question
            </H4>
          </Pressable>
        </View>
      ) : answered && currentQuestionNumber === 10 ? (
        <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={handleResult}
        >
          <H4 color="white" style={{ fontWeight: "500" }}>
            See Your Score
          </H4>
        </Pressable>
      </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  question: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  questionContainer: {
    backgroundColor: "white",
    height: "auto",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 20,
  },
  optionCorrect: {
    backgroundColor: "#6db46d",
  },
  optionIncorrect: {
    backgroundColor: "#FF2400",
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: "#E55451",
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
