import React, { memo } from "react";
import Song, { SongInterface } from "./Song";
import Skeleton from "@mui/material/Skeleton";
import "./style.css";

interface SongListProps {
  songList: SongInterface[];
  isLoading: boolean;
}

const SongList: React.FC<SongListProps> = ({ songList, isLoading }) => {
  return (
    <div className="song-list">
      {isLoading
        ? Array.from(Array(50)).map((item, index) => (
            <Skeleton animation="wave" key={index} />
          ))
        : songList?.map((song, index) => (
            <Song song={song} index={index} key={song.music} />
          ))}
    </div>
  );
};

export default memo(SongList);
