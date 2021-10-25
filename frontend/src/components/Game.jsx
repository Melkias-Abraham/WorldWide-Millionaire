import React, { useState } from "react";import { useEffect } from "react";


export default function Game(props) {
  const { onStart, questionNumber, continent, state } = props;
  const [question, setQuestion] = useState(null)



  useEffect(() => {
    onStart(continent.id)
  }, [continent]);


  useEffect(() => {
    if (!state.questions) return <span>loading...</span>;
    setQuestion(state.questions[questionNumber-1])
  }, [state.questions, questionNumber]);
  


  if (!state.questions) return <span>loading...</span>;

  // console.log("state:", state, "question:",question);

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
