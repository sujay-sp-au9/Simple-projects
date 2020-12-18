import React from "react";

export default function Spinner(props) {
  return (
    <div class="ui active dimmer">
      <div class="ui massive text loader">{props.message}</div>
    </div>
  );
}

Spinner.defaultProps = {
  message: "Loading...",
};
