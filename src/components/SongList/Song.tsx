import React, { useContext } from "react";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { SongContext } from "../../App";

export interface SongInterface {
  avatar: string;
  bgImage: string;
  coverImage: string;
  creator: string;
  lyric: string;
  music: string;
  title: string;
  url: string;
}

interface SongProps {
  song: SongInterface;
  index: number;
}

const Song: React.FC<SongProps> = ({ song, index }) => {
  const { avatar, creator, title } = song;
  const { changeSongIndex } = useContext(SongContext);
  return (
    <div className="song" onClick={() => changeSongIndex(index)}>
      <span>{index < 9 ? `0${index + 1}` : index + 1}</span>
      <img src={avatar} alt="avatar" className="avatar" />
      <div>
        <b className="song-name">{title}</b>
        <p className="song-creator">{creator}</p>
      </div>
      <LibraryMusicIcon className="song-icon" />
    </div>
  );
};

export default Song;
