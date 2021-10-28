import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../providers/AuthProviders";
import { useHistory } from "react-router-dom";
import { stateContext } from "../providers/StateProvider";


const useGameLogic = (props, setClassName) => {
const { questionNumber, setQuestionNumber, setStop } = props;
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(30);
  const [pause, setPause] = useState(false);
  const history = useHistory();

  const { state, getQuestions, setScores, setEarned } =
    useContext(stateContext);
  const { userId } = useContext(authContext);

  const continent = state.continent && state.continent;

  useEffect(() => {
    if (!pause) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      if (remainingTime === 0) {
        setScores(userId, state.earned);
        return setStop(true);
      }
      return () => clearInterval(interval);
    }
  }, [setStop, remainingTime, state.earned, userId]);

  useEffect(() => {
    if (!continent) return history.replace("/");
    getQuestions(continent.id);
  }, [continent]);

  console.log(state);
  useEffect(() => {
    if (!state.questions) return <span>loading...</span>;
    setQuestion(state.questions[questionNumber - 1]);
  }, [state.questions, questionNumber]);



  useEffect(() => {
    const finalEarning =
      questionNumber > 1 &&
      moneyAmounts.find((money) => money.id === questionNumber - 1).amount;

    setScores(userId, finalEarning);
    questionNumber > 1 && setEarned(finalEarning);
  }, [questionNumber]);

  const delay = (duration, cb) => {
    setTimeout(() => {
      cb();
    }, duration);
  };

  const handleClick = (ans) => {
    setselectedAnswer(ans);
    setClassName("answer active");
    setPause(true);

    delay(3000, () => {
      setClassName(ans.correct ? "answer correct" : "answer wrong ");
    });

    delay(6000, () => {
      if (ans.correct) {
        setQuestionNumber((prev) => prev + 1);
        setselectedAnswer(null);
        setPause(false);
        setRemainingTime(30);
      } else {
        setStop(true);
      }
    });
  };

  // earnings hierarchy - removed '$' so that leaderboard can use numbers and show in descending order
  const moneyAmounts = [
    { id: 10, amount: "1000000" },
    { id: 9, amount: "500000" },
    { id: 8, amount: "250000" },
    { id: 7, amount: "100000" },
    { id: 6, amount: "50000" },
    { id: 5, amount: "10000" },
    { id: 4, amount: "5000" },
    { id: 3, amount: "1000" },
    { id: 2, amount: "500" },
    { id: 1, amount: "100" },
  ];


  return {
    remainingTime,
    question,
    moneyAmounts,
    questionNumber,
    selectedAnswer,
    handleClick
  };
};

export default useGameLogic;
