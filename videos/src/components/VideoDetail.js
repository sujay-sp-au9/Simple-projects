import React from "react";

export default function VideoDetail({ video }) {
  return (
    <div>
      <div className="ui embed">
        <iframe
          title={video.snippet.title}
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
}
