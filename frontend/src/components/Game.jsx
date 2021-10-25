import React, { useState } from "react";import { useEffect } from "react";


export default function Game(props) {
  const { onStart, questionNumber, continent, state } = props;
  const [question, setQuestion] = useState(null)



  useEffect(() => {
    onStart(continent.id)
  }, [continent]);


  // after 'start game' is clicked, onStart chooses the continent's id to pull questions
  useEffect(() => {
    if (!state.questions) return <span>loading...</span>;
    setQuestion(state.questions[questionNumber-1])
  }, [state.questions, questionNumber]);
  

  
  // uncomment this and check the console to see all the questions and answers structure
  // console.log("state:", state);

  return (

       <div>
       <div>{question?.question}</div>
       <div>
         {question?.answers[0].map(answer => (
           <div>
             {answer.answer}
           </div>
         ))}
       </div>
     </div>
  );
}
