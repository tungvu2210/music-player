import React, { memo } from "react";
import Details from "./Details";
import Control from "./Control";
import "./style.css";

const Player: React.FC = () => {
  return (
    <div className="player">
      <h2>Now Playing</h2>
      <Details />
      <Control />
    </div>
  );
};

export default memo(Player);
