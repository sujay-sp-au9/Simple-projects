import React from "react";

export default function pageIndicator(props) {
  return (
    <React.Fragment>
      <button onClick={props.setPage}>Prev page</button>
      <span>{` ${props.page} `}</span>
      <button onClick={props.setPage}>Next page</button>
    </React.Fragment>
  );
}
