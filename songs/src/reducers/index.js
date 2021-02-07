import { combineReducers } from "redux";

const songsReducer = () => {
  return [
    { title: "Fear Inoculum", duration: "11:09" },
    { title: "Senorita", duration: "3:09" },
    { title: "Riders on the storm", duration: "6:09" },
    { title: "Hotel California", duration: "5:09" },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SELECT_SONG") {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
});
