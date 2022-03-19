import React, { useContext, useEffect, useRef, useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { SongContext } from "../../App";

const Control: React.FC = () => {
  const audio = useRef<HTMLAudioElement>(null!);

  const [isLooping, setIsLooping] = useState(false);

  const { isPlaying, setIsPlaying, currSongIndex, changeSongIndex, song } =
    useContext(SongContext);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [currSongIndex, isPlaying]);

  return (
    <div className="control">
      <audio
        src={song?.music}
        controls
        ref={audio}
        loop={isLooping}
        onEnded={() => changeSongIndex(currSongIndex + 1)}
      ></audio>
      <div className="control-icons">
        <div
          className="control-icon"
          onClick={() => changeSongIndex(currSongIndex - 1)}
        >
          <SkipPreviousIcon fontSize="large" />
        </div>
        <div className="control-icon">
          {isPlaying ? (
            <PauseCircleOutlineIcon
              fontSize="large"
              onClick={() => setIsPlaying(!isPlaying)}
            />
          ) : (
            <PlayCircleOutlineIcon
              fontSize="large"
              onClick={() => setIsPlaying(!isPlaying)}
            />
          )}
        </div>
        <div
          className="control-icon"
          onClick={() => changeSongIndex(currSongIndex + 1)}
        >
          <SkipNextIcon fontSize="large" />
        </div>
        <div className="control-icon" onClick={() => setIsLooping(!isLooping)}>
          <RepeatOneIcon
            fontSize="large"
            color={isLooping ? "error" : "inherit"}
          />
        </div>
      </div>
    </div>
  );
};

export default Control;
