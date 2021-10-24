import React, { useState } from "react";
import "./App.css";
import useApplicationData from "./hooks/useApplicationData";
import ReactTooltip from "react-tooltip";

import MapChart from "./components/MapChart";
import Game from "./components/Game";

const App = () => {
  const [continent, setContinent] = useState({
    name: "",
    id: "",
  });
  const {
    state,
    // dispatch,
    getQuestions
  } = useApplicationData();
  
  const userList = state.users.map((user) => (
    <li key={user.id}>
      {" "}
      {user.first_name} {user.last_name} {user.email}{" "}
    </li>
  ));
  const [content, setContent] = useState("");
  const [start, setStart] = useState("");

  console.log(state);
  return (
    <div className="App">
      {/* <h1> Users </h1>
  <ul> {userList} </ul> */}
      {start !== "started" ? (
        <div className="map">
          <MapChart
            setStart={setStart}
            continent={continent}
            setContinent={setContinent}
            setTooltipContent={setContent}
          />
          <ReactTooltip>{content}</ReactTooltip>
        </div>
      ) : (
        <div>
          <Game state={state} continent={continent} onStart={getQuestions} />
        </div>
      )}
    </div>
  );
};

export default App;

