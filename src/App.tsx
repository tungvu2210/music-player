import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

interface SongContextInterface {
  changeSongIndex(newSongIndex: number): void;
  song: SongInterface;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currSongIndex: number;
}

export const SongContext = createContext<SongContextInterface>(
  {} as SongContextInterface
);

function App() {
  const initialSongList = useRef<SongInterface[]>([]);
  const [songList, setSongList] = useState<SongInterface[]>([]);

  const [currSong, setCurrSong] = useState<SongInterface>({} as SongInterface);
  const currSongIndex = useRef<number>(0);

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

  const value: SongContextInterface = {
    changeSongIndex,
    song: currSong,
    isPlaying,
    setIsPlaying,
    currSongIndex: currSongIndex.current,
  };

  return (
    <div className="App">
      <div className="container">
        <SongContext.Provider value={value}>
          <FilterGroup
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setMusicCategory={setMusicCategory}
            categoryTitle={musicCategory.title}
          />
          <SongList songList={songList} isLoading={isLoading} />
          <Player />
        </SongContext.Provider>
      </div>
    </div>
  );
}

export default App;
