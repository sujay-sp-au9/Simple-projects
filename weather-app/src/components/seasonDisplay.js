import "./seasonDisplay.css";
import React from "react";

const getSeason = (lat, month) => {
  if (month > 3 && month < 10) {
    return lat > 0 ? "summer" : "winter";
  } else {
    return lat > 0 ? "winter" : "summer";
  }
};

const seasonConfig = {
  winter: {
    text: "Burr, it's chilly.",
    icon: "snowflake",
  },
  summer: {
    text: "Let's hit the beach",
    icon: "sun",
  },
};

export default function SeasonDisplay(props) {
  const season = getSeason(props.latitude, new Date().getMonth() + 1);
  const { text, icon } = seasonConfig[season];
  return (
    <div className={`season-display ${season}`}>
      <i className={`${icon} massive icon icon-left`}></i>
      <h1>{text}</h1>
      <i className={`${icon} massive icon icon-right`}></i>
    </div>
  );
}
