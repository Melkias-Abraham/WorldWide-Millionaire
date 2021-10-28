import React, { useState } from "react";
import "./App.css";
import ReactTooltip from "react-tooltip";
import StateProvider from "./providers/StateProvider";
import MapChart from "./components/MapChart";
import Trivia from "./components/Trivia";
import Leaderboard from "./components/Leaderboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);

  // being used to set the game to stop if question answered wrong
  const [stop, setStop] = useState(false);

  // being used by react tooltip (the hover effect that shows the continent name)
  const [content, setContent] = useState("");

  // using setStart as a temporary way to transition from map to question page -- will need to change later to check for user --
  const [start, setStart] = useState("");

  const [earned, setEarned] = useState(0);

  // Used for displaying money once game ends
  const getEarnings = (earnings) => {
    setEarned(earnings);
  };

  // console.log(state);
  return (
    <div className="App">
      <StateProvider>
        <Router>
          <Switch>
            <Route path="/scores">
              <Leaderboard myProp="something" />
            </Route>
            <Route exact path="/">
              <div className="map">
                <MapChart setStart={setStart} setTooltipContent={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
              </div>
            </Route>
            <Route path="/game">
              {stop ? (
                <h1 className="endGame"> You earned: {earned} </h1>
              ) : (
                <Trivia
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                  setStop={setStop}
                  setEarned={setEarned}
                  getEarnings={getEarnings}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </StateProvider>
    </div>
  );
};

export default App;
