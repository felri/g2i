import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  answersReceived
} from "../redux/questions";

const Question = (props) => {
  const [question, setQuestion] = React.useState(null);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.data);

  const handleAnswer = (answer) => {
    dispatch(answersReceived({question: question.question, answer}));
    props.navigation.push('Question')
  }

  const getQuestion = () => {
    const aux = questions.find(f => !f.answer)
    aux ? setQuestion(aux) : props.navigation.navigate('Results')
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getQuestion();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if(question) {
      props.navigation.setOptions({ title: question.category })
    }
  }, [question]);

  return (
    question && 
      <View style={styles.container}>
        <Text style={styles.question}>
          {question && question.question.replace(/&quot;/g, '"').replace(/&#039;/g, '`')}
        </Text>
        <View style={styles.containerBtn}>
          <TouchableOpacity onPress={() => handleAnswer('True')}>
          <View style={[styles.button, {backgroundColor: 'green'}]}>
              <Text style={styles.answer}>True</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAnswer('False')}>
            <View style={[styles.button, {backgroundColor: 'red'}]}>
              <Text style={styles.answer}>False</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  containerBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: 'row'
  },
  question: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  button: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Question;
