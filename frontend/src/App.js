import React, { useState, useContext } from "react";
import "./App.css";
import ReactTooltip from "react-tooltip";
import { stateContext } from "./providers/StateProvider";
import MapChart from "./components/MapChart";
import Trivia from "./components/Trivia";
import Leaderboard from "./components/Leaderboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EndGame from "./components/EndGame";

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);

  // using the context api from providers folder to get the earnings - helps because we don't have to send props down.
  const { state } = useContext(stateContext);
  // being used to set the game to stop if question answered wrong
  const [stop, setStop] = useState(false);

  // being used by react tooltip (the hover effect that shows the continent name)
  const [content, setContent] = useState("");

  // ---- using this directly inside Trivia component using contex api.------
  // // Used for displaying money once game ends
  // const getEarnings = (earnings) => {
  //   setEarned(earnings);
  // };

  // console.log(state);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/scores">
            <Leaderboard myProp="something" />
          </Route>
          <Route exact path="/">
            <div className="map">
              <MapChart setTooltipContent={setContent} />
              <ReactTooltip>{content}</ReactTooltip>
            </div>
          </Route>
          <Route path="/game">
            {stop || questionNumber === 11 ? (
              <EndGame setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setStop={setStop} earned={state && state.earned} />
            ) : (
              <Trivia
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setStop={setStop}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
