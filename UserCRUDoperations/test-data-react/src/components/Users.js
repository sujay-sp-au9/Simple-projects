import React from "react";
import User from "./User";

export default function Users({ users, page, pageSize, setOperated }) {
  const renderedUsers = [
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
    <User />,
  ];
  return (
    <div
      style={{
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1vw",
      }}
    >
      {renderedUsers}
    </div>
  );
}
