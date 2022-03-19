import React, { useContext } from "react";
import { SongContext } from "../../App";

const Details: React.FC = () => {
  const { song, isPlaying } = useContext(SongContext);
  return (
    <div className="detail">
      <img
        src={song?.avatar}
        alt="avatar"
        className={isPlaying ? "playing" : ""}
      />
      <h2>{song?.title}</h2>
      <p>{song?.creator}</p>
    </div>
  );
};

export default Details;
