import "./ImageList.css";
import React from "react";
import ImageCard from "./ImageCard";

export default function populateImages(props) {
  const images = props.images.map((image) => {
    return <ImageCard key={image.id} image={image} loading="lazy" />;
  });
  return <div className="image-list">{images}</div>;
}
