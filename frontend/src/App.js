import React, { useState } from "react";
import "./App.css";

import useApplicationData from "./hooks/useApplicationData";
import ReactTooltip from "react-tooltip";

import MapChart from "./components/MapChart";
import Trivia from "./components/Trivia";

const App = () => {
  const [continent, setContinent] = useState({
    name: "",
    id: "",
  });
  const [questionNumber, setQuestionNumber] = useState(1);
  const storage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(storage.getItem("user"));

  const { state, dispatch, getQuestions } = useApplicationData();

  // being used to set the game to stop if question answered wrong
  const [stop, setStop] = useState(false)

  // being used by react tooltip (the hover effect that shows the continent name)
  const [content, setContent] = useState("");

  // using setStart as a temporary way to transition from map to question page -- will need to change later to check for user --
  const [start, setStart] = useState("");

  const [earned, setEarned] = useState(0)

  // Used for displaying money once game ends
  const getEarnings = (earnings) => {
    setEarned(earnings)
  }


  // console.log(state);
  return (
    <div className="App">
      {/* 
      - gonna need to change Game component to our real Trivia/Question display component
      - for now, check if 'start' is equal to started, and if not show map - otherwise go to game page (<Game/>)
      - will 'start' to log in user later
      
      */}
      {stop ? <h1 className="App"> You earned: {earned} </h1> : 
    <React.Fragment>
      {start !== "started" ? (
        <div className="map">
          <MapChart
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            storage={storage}
            setStart={setStart}
            continent={continent}
            setContinent={setContinent}
            setTooltipContent={setContent}
          />
          <ReactTooltip>{content}</ReactTooltip>
        </div>
      ) : (
        <div>
          <Trivia
            questionNumber={questionNumber}
            state={state}
            continent={continent}
            onStart={getQuestions}
            setQuestionNumber={setQuestionNumber}
            setStop={setStop}
            setEarned={setEarned}
            getEarnings={getEarnings}
          />
        </div>
      )}
      </React.Fragment>}
    </div>
  );
};

export default App;
