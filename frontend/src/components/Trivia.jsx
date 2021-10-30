import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import correct from "../addons/correct.wav";
import idle from "../addons/idle.wav";
import start from "../addons/start.wav";
import wrong from "../addons/wrong.wav";

import "./Trivia.css";
import useGameLogic from "../hooks/useGameLogic";

export default function Trivia(props) {
  const [className, setClassName] = useState("answer");

  const [newGame] = useSound(start);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [waiting] = useSound(idle);

  useEffect(() => {
    newGame();
  }, [newGame]);

  const {
    remainingTime,
    question,
    moneyAmounts,
    questionNumber,
    selectedAnswer,
    handleClick,
  } = useGameLogic(props, setClassName, correctAnswer, wrongAnswer);

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
              $ {level.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
