import React, { useState } from "react";
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import ReactTooltip from "react-tooltip";


import MapChart from "./components/MapChart";


const App = () => {
  const {
      state,
      // dispatch
  } = useApplicationData();
    const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
));
  const [content, setContent] = useState("");

return (<div className="App" >
  {/* <h1> Users!! </h1>
  <ul> {userList} </ul> */}
  <div className="map">
  <MapChart  setTooltipContent={setContent} />
  <ReactTooltip>{content}</ReactTooltip>
  </div>
</div >
);
};

export default App;
