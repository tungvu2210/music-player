import React, { Dispatch, memo, SetStateAction } from "react";
import Details from "./Details";
import Control from "./Control";
import { SongInterface } from "../SongList/Song";
import "./style.css";

export interface PlayerInterface {
  song: SongInterface;
  currSongIndex: number;
  changeSongIndex(newSongIndex: number): void;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}
const Player: React.FC<PlayerInterface> = ({
  song,
  currSongIndex,
  changeSongIndex,
  isPlaying,
  setIsPlaying,
}) => {
  return (
    <div className="player">
      <h2>Now Playing</h2>
      <Details song={song} isPlaying={isPlaying} />
      <Control
        song={song}
        changeSongIndex={changeSongIndex}
        currSongIndex={currSongIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default memo(Player);
