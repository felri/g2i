import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const Item = ({ item }) => (
  <View style={styles.containerItem}>
    <Text style={[styles.correct, { color: item.correct ? 'green' : 'red' }]}>
      {item.correct ? "+" : "-" }
    </Text>
    <Text style={styles.question}>
      {item.question.replace(/&quot;/g, '"').replace(/&#039;/g, "`")}
    </Text>
  </View>
);

const Score = ({score, total}) => (
  <View style={styles.scoreContainer}>
    <Text style={styles.score}>
      You Scored
    </Text>
    <Text>
      {score} / {total}
    </Text>
  </View>
  )

const Question = (props) => {
  const questions = useSelector((state) => state.questions.data);

  const handlePlayAgain = () => {
    props.navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.containerScroll}>
      <Score total={questions.length} score={questions.filter(f => f.correct).length}/>
      <View style={styles.container}>
        {questions.map((item) => (
          <Item item={item} key={item.question} />
        ))}
        <View>
          <TouchableOpacity onPress={handlePlayAgain} style={styles.playContainer}>
            <Text>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    padding: 10,
    backgroundColor: "#F5FCFF",
  },
  playContainer: {
    width: 200,
    height: 50,
    backgroundColor: "#00A5E0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 20,
  },
  question: {    
    fontSize: 14,
    textAlign: "center",
    flex: 9
  },
  correct: {
    fontSize: 20,
    flex: 1,
    color: "#00FF00",
  },
  containerItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,

  },
});

export default Question;
