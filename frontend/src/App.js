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

  // being used by react tooltip (the hover effect that shows the continent name)
  const [content, setContent] = useState("");

  // using setStart as a temporary way to transition from map to question page -- will need to change later to check for user --
  const [start, setStart] = useState("");

  // console.log(state);
  return (
    <div className="App">
      {/* 
      - gonna need to change Game component to our real Trivia/Question display component
      - for now, check if 'start' is equal to started, and if not show map - otherwise go to game page (<Game/>)
      - will 'start' to log in user later
      
      */}
      <StateProvider>
        <Router>
          <Switch>
            <Route path="/scores">
              <Leaderboard myProp="something" />
            </Route>
          </Switch>
        </Router>
      </StateProvider>
      {/* <StateProvider>
        {start !== "started" ? (
          <div className="map">
            <MapChart setStart={setStart} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
          </div>
        ) : (
          <div>
            <Trivia
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
            />
          </div>
        )}
      </StateProvider> */}
    </div>
  );
};

export default App;
