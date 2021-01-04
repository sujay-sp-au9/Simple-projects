import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/spinner";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import useVideos from "./hooks/useVideos";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, search] = useVideos("trending");
  useEffect(() => {
    setSearchInput("trending");
  }, []);
  const onSearchInputChange = async (input) => {
    setSearchInput(input);
    setLoading(true);
    await search(input);
    setLoading(false);
  };
  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);
  return (
    <div className="ui container">
      {loading ? <Spinner message="Loading..." /> : null}
      <SearchBar onSubmit={onSearchInputChange} />
      <h4 style={{ textAlign: "center" }}>
        {videos.length > 0
          ? `Found ${videos.length} videos of "${searchInput}"`
          : null}
      </h4>
      <div className="video-container">
        <div className="selected-video">
          {selectedVideo ? <VideoDetail video={selectedVideo} /> : null}
        </div>
        <VideoList onVideoSelect={setSelectedVideo} videos={videos} />
      </div>
    </div>
  );
}
