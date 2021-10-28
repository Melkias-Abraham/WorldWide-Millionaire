import React from "react";
import { useHistory } from "react-router";


import "./EndGame.css";

import Button from "@mui/material/Button";

export default function EndGame(props) {
  const { earned, setStop, setQuestionNumber } = props;
  const history = useHistory();

  const handleRestartClick = () => {
    setStop(false);
    setQuestionNumber(1);
    history.replace("/");
  };

  return (
    <div className="endGame">
      {earned == 0 ? (
        <div className="title">
          You've earned {earned}. Better luck next time!{" "}
        </div>
      ) : (
        <div className="title">Congratulations, you've earned {earned}.</div>
      )}
      <div className="replay">
        <div className="text">Would you like to play again?</div>
        <Button onClick={handleRestartClick} variant="contained">
          Restart
        </Button>
      </div>
    </div>
  );
}
