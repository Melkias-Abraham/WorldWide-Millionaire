import React from "react";
import { useState, useEffect, useContext } from "react";
import "./Trivia.css";
import { stateContext } from "../providers/StateProvider";
import { useHistory } from "react-router-dom";
import { authContext } from "../providers/AuthProviders";
import useGameLogic from "../hooks/useGameLogic";

export default function Trivia(props) {

  const [className, setClassName] = useState("answer");

  const {
    remainingTime,
    question,
    moneyAmounts,
    questionNumber,
    selectedAnswer,
    handleClick

  } = useGameLogic(props, setClassName);


  return (
    <div className="trivia">
      <div className="main">
        <div className="top">
          <div className={remainingTime < 11 ? "timer runningout" : "timer"}>
            {remainingTime}
          </div>
        </div>

        <div className="bottom">
          <div className="question">{question?.question}</div>

          <div className="answers">
            {question?.answers[0].map((answer) => (
              <div
                key={answer.id}
                className={selectedAnswer === answer ? className : "answer"}
                onClick={() => handleClick(answer)}
              >
                {answer.answer}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="money">
        <ul className="moneyList">
          {moneyAmounts.map((level) => (
            <li
              key={level.id}
              className={
                level.id === questionNumber
                  ? "moneyListItem current"
                  : "moneyListItem"
              }
            >
              {level.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
