import React, { memo } from "react";
import Song, { SongInterface } from "./Song";
import Skeleton from "@mui/material/Skeleton";
import "./style.css";

interface SongListProps {
  songList: SongInterface[];
  changeSongIndex(newSongIndex: number): void;
  isLoading: boolean;
}

const SongList: React.FC<SongListProps> = ({
  songList,
  changeSongIndex,
  isLoading,
}) => {
  return (
    <div className="song-list">
      {isLoading
        ? Array.from(Array(100)).map((item, index) => (
            <Skeleton animation="wave" key={index} />
          ))
        : songList?.map((song, index) => (
            <Song
              song={song}
              index={index}
              key={song.music}
              changeSongIndex={changeSongIndex}
            />
          ))}
    </div>
  );
};

export default memo(SongList);
