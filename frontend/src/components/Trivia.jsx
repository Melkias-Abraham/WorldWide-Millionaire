import React from "react";
import { useState, useEffect } from "react";
import "./Trivia.css";


export default function Trivia(props) {
 
  const { onStart, questionNumber, continent, state, setQuestionNumber } = props;
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setselectedAnswer] = useState(null)
  const [className, setClassName] = useState("answer")


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
        setQuestionNumber((prev) => prev +1)
      }
    })
  }

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers[0].map((answer) => (
          <div className={selectedAnswer === answer ? className : "answer"} onClick={() => handleClick(answer)}>
            {answer.answer}
          </div>
        ))}
      </div>
    </div>
  );
}
