import "./App.css";
import React from "react";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/spinner";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import youtube from "./apis/youtube";

export default class App extends React.Component {
  state = { searchInput: "", loading: false, videos: [], selectedVideo: null };
  getSearchResults = async (searchInput) => {
    this.setState({ loading: true, searchInput });
    const results = await youtube.get("/search", {
      params: {
        q: searchInput,
      },
    });
    this.setState({
      loading: false,
      videos: results.data.items,
      selectedVideo: results.data.items[0],
    });
  };
  onVideoSelect = (selectedVideo) => {
    this.setState({ selectedVideo });
  };
  render() {
    return (
      <div className="ui container">
        {this.state.loading ? <Spinner message="Loading..." /> : null}
        <SearchBar onSubmit={this.getSearchResults} />
        <h4 style={{ textAlign: "center" }}>
          {this.state.videos.length > 0
            ? `Found ${this.state.videos.length} videos of "${this.state.searchInput}"`
            : null}
        </h4>
        <div className="video-container">
          <div className="selected-video">
            {this.state.selectedVideo ? (
              <VideoDetail video={this.state.selectedVideo} />
            ) : null}
          </div>
          <VideoList
            onVideoSelect={this.onVideoSelect}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}
