import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import FilterGroup from "./components/FilterGroup";
import SongList from "./components/SongList";
import Player from "./components/Player";
import { SongInterface } from "./components/SongList/Song";

export interface MusicCategory {
  name: string;
  index: number;
  title: string;
}

function App() {
  const initialSongList = useRef<SongInterface[]>([]);
  const [songList, setSongList] = useState<SongInterface[]>([]);

  const [currSong, setCurrSong] = useState<SongInterface>({} as SongInterface);
  const currSongIndex = useRef(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [musicCategory, setMusicCategory] = useState<MusicCategory>({
    name: "top100_VN",
    index: 0,
    title: "Nhạc Trẻ",
  });

  const getSongList = async (category: MusicCategory) => {
    setIsLoading(true);

    const res = await fetch("https://tinyurl.com/7frz2rdw");
    const { songs } = await res.json();

    const { name, index } = category;
    const { songs: result } = songs[name][index];

    initialSongList.current = result;
    setSongList(result);

    setCurrSong(result[0]);

    setIsPlaying(false);
    setIsLoading(false);
  };

  const changeSongIndex = useCallback(
    (newSongIndex: number) => {
      if (newSongIndex < 0 || newSongIndex === songList.length) {
        return;
      }
      currSongIndex.current = newSongIndex;
      setCurrSong(songList[newSongIndex]);
    },
    [songList]
  );

  const handleSearch = (searchTerm: string) => {
    const newSongList = initialSongList.current.filter(({ title }) =>
      searchTerm === "" ? true : title.toLowerCase().indexOf(searchTerm) !== -1
    );
    setSongList(newSongList);
  };

  useEffect(() => {
    getSongList(musicCategory);
  }, [musicCategory]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="App">
      <div className="container">
        <FilterGroup
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setMusicCategory={setMusicCategory}
          categoryTitle={musicCategory.title}
        />
        <SongList
          songList={songList}
          changeSongIndex={changeSongIndex}
          isLoading={isLoading}
        />
        <Player
          song={currSong}
          changeSongIndex={changeSongIndex}
          currSongIndex={currSongIndex.current}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
}

export default App;
