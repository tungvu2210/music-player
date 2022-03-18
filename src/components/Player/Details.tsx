import React from "react";
import { SongInterface } from "../SongList/Song";
interface DetailsProps {
  song: SongInterface;
  isPlaying: boolean;
}

const Details: React.FC<DetailsProps> = ({ song, isPlaying }) => {
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
