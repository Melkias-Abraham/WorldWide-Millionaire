import React from "react";

import "./EndGame.css";

import Button from "@mui/material/Button";

export default function EndGame(props) {
  const { earned } = props;

  return (
    <div className="endGame">
      <div className="title">Congratulations, you've earned {earned}.</div>
      <div className="replay">
        <div className="text">
          Would you like to play again?
        </div>
        <Button variant="contained">Restart</Button>
      </div>
    </div>
  )
}