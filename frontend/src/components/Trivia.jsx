import React from "react";
import { useState, useEffect } from "react";
import "./Trivia.css";


export default function Trivia(props) {

  const { onStart, questionNumber, continent, state, setQuestionNumber } = props;
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setselectedAnswer] = useState(null)
  const [className, setClassName] = useState("answer")
  const [remainingTime, setRemainingTime] = useState(30)

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prev) => prev - 1)
    }, 1000)
  }, [])

  useEffect(() => {
    onStart(continent.id);
  }, [continent]);

  useEffect(() => {
    if (!state.questions) return <span>loading...</span>;
    setQuestion(state.questions[questionNumber - 1]);
  }, [state.questions, questionNumber]);

  const delay = (duration, cb) => {
    setTimeout(() => {
      cb();
    }, duration)
  }

  const handleClick = (ans) => {
    setselectedAnswer(ans);
    setClassName("answer active");

    delay(3000, () => {
      setClassName(ans.correct ? "answer correct" : "answer wrong ")
    });

    delay(6000, () => {
      if (ans.correct) {
        setQuestionNumber((prev) => prev + 1)
      }
    })
  }

  const moneyAmounts = [
    { id: 10, amount: "$ 1000000" },
    { id: 9, amount: "$ 500000" },
    { id: 8, amount: "$ 250000" },
    { id: 7, amount: "$ 100000" },
    { id: 6, amount: "$ 50000" },
    { id: 5, amount: "$ 10000" },
    { id: 4, amount: "$ 5000" },
    { id: 3, amount: "$ 1000" },
    { id: 2, amount: "$ 500" },
    { id: 1, amount: "$ 100" }
  ];

  return (
    <div className="trivia">
      <div className="main">


        <div className="top">
          <div className={remainingTime < 11 ? "timer runningout" : "timer"}>{remainingTime}</div>
        </div>

        <div className="bottom">
          <div className="question">{question?.question}</div>

          <div className="answers">
            {question?.answers[0].map((answer) => (
              <div className={selectedAnswer === answer ? className : "answer"} onClick={() => handleClick(answer)}>
                {answer.answer}
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="money">
        <ul className="moneyList">
          {moneyAmounts.map((level) => (
            <li key={level.id} className={level.id === questionNumber ? "moneyListItem current" : "moneyListItem"}>
              {level.amount}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
