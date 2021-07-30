import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  questionsReceived,
  questionsLoading,
  questionsError,
} from "../redux/questions";
import { fetchQuestions } from "../utils/api";

const Home = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.questions.loading);

  const getQuestions = async () => {
    dispatch(questionsLoading());
    const response = await fetchQuestions();
    response.error
      ? dispatch(questionsError())
      : dispatch(questionsReceived(response.data.results));
  };

  const handleBegin = () => {
    props.navigation.navigate('Question')
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getQuestions();
    });
    return unsubscribe;
  }, []);

  if (loading === "pending") {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        You will be presented with 10 True of False questions
      </Text>
      <Text style={styles.welcome}>Can you score 100%?</Text>
      <TouchableOpacity onPress={handleBegin}>
        <View style={styles.buttonBegin}>
          <Text>BEGIN</Text>
        </View>
      </TouchableOpacity>
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  buttonBegin: {
    width: 200,
    height: 50,
    backgroundColor: "#00A5E0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
