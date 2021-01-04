import React from "react";
import VideoItem from "./VideoItem";

export default function VideoList({ videos, onVideoSelect }) {
  const renderedVideos = videos.map((video) => {
    return (
      <VideoItem
        onVideoSelect={onVideoSelect}
        key={video.id.videoId}
        video={video}
      />
    );
  });
  if (renderedVideos.length === 0) {
    return null;
  }
  return (
    <div
      style={{
        maxHeight: "32rem",
        overflow: "hidden",
        overflowY: "scroll",
        marginTop: "2rem",
      }}
      className="ui relaxed divided list"
    >
      {renderedVideos}
    </div>
  );
}
