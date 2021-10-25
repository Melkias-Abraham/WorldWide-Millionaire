import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Trivia.css";

export default function Trivia(props) {
  console.log(props);
  const { onStart, questionNumber, continent, state } = props;
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setselectedAnswer] = useState(null)

  useEffect(() => {
    onStart(continent.id);
  }, [continent]);

  useEffect(() => {
    if (!state.questions) return <span>loading...</span>;
    setQuestion(state.questions[questionNumber - 1]);
  }, [state.questions, questionNumber]);

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers[0].map((answer) => (
          <div className="answer" onClick={handleClick}>{answer.answer}</div>
        ))}
        {/* <div className="answer correct">Ottawa</div>
        <div className="answer wrong ">New York City</div>
        <div className="answer wrong">Toronto</div>
        <div className="answer wrong">Washington D.C</div> */}
      </div>
    </div>
  );
}
